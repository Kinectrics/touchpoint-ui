import React, {useState, useEffect, useRef} from 'react'
import './InputCell.css'

export default function InputCell(props) {
	
	const [initalValue, setInitialValue] = useState(
		props.dataRow[props.header.headerID] ? props.header.format(props.dataRow[props.header.headerID]) : ''
	)
	
	const [currentValue, setCurrentValue] = useState(
		props.dataRow[props.header.headerID] ? props.header.format(props.dataRow[props.header.headerID]) : ''
	)
	
	// Update the value if the data is changed by an outside source
	useEffect(() => {
		const newVal = props.dataRow[props.header.headerID] ? props.dataRow[props.header.headerID] : ''
		setCurrentValue(props.header.format(newVal))
		setInitialValue(newVal)
		
	}, [ props.dataRow[props.header.headerID] ])
	
	//When you focus on an item, the value is saved. if you escape, its restored
	function focusHandler(e){
		setInitialValue(e.target.value)
	}
	
	const escRef = useRef(false)
	
	//Handles keypresses, for enter or esc keys
	function keyHandler(e){
		if(e.keyCode === 27) { //esc
			setCurrentValue(initalValue)
			escRef.current = true
			e.target.blur()
		} else if(e.keyCode === 13){ //enter
			e.target.blur()
		}
	}
	
	const [validClass, setValidClass] = useState('')
	
	function flashRed(){
		setValidClass('invalid')
		setTimeout(()=>setValidClass(''), 200)
	}
	
	function flashGreen() {
		setValidClass('valid')
		setTimeout(() => setValidClass(''), 0)
	}
	
	//Chaches the value and updates the dataset when you're done editing
	function selectHandler(e) {
		setCurrentValue(e.target.value)
		commitChanges(e.target.value)
	}
	
	//Check if the input is valid and commit
	async function commitChanges(val){
		
		const newValue = val ? val : currentValue
		
		if(escRef.current){
			escRef.current = false
			return
		}
		
		const override = {value: false, newRow: {}}
		
		function customSetRow(newRow){
			props.setRow(newRow)
			override.value = true
			override.newRow = newRow
		}
		
		try{
			if (props.header.compare(props.dataRow[props.header.headerID], newValue)) { return }
			const newData = JSON.parse(JSON.stringify([...props.dataset.read()]))
			const newCellValue = props.header.parse(newValue)
			
			newData[props.rowIndex][props.header.headerID] = newCellValue
			
			const res = await props.header.onEdit({
				cellValue: newCellValue, 
				row: newData[props.rowIndex], 
				oldCellValue: initalValue, 
				oldRow: props.dataset.read()[props.rowIndex],
				setRow: customSetRow,
			})
			
			if(res || res === undefined){
				if(override.value){//if the onEdit handler is assuming control, dont edit the dataset in here
					setCurrentValue(props.header.format(override.newRow[props.header.headerID]))
				} else{
					props.dataset.set(newData)
					setCurrentValue(props.header.format(newCellValue))
				}
				flashGreen()
			} else{
				setCurrentValue(props.header.format(initalValue))
				flashRed()
			}
			
		} catch (err){
			console.error(err)
			setCurrentValue(props.header.format(initalValue))
			flashRed()
		}
	}
	
	//Chaches the value and updates the dataset when you're done editing
	function changeHandler(e) {
		setCurrentValue(e.target.value)
	}
	
	
	//Combobox cells
	if(props.header.options){
		return <select
			className={'InputCell input ' + validClass}
			onKeyDown={keyHandler}
			onFocus={focusHandler}
			value={currentValue}
			onChange={selectHandler}
		>
			{props.header.options.map(v=>{
				return<option key={v} value={v}>{v}</option>
			})}
		</select>
	}
	
	return(<input
		type = 'text'
		className = {'InputCell input ' + validClass}
		onKeyDown = {keyHandler}
		onFocus = {focusHandler}
		onBlur = {()=>commitChanges()}
		value = {currentValue}
		onChange = {changeHandler}
	/>)
}