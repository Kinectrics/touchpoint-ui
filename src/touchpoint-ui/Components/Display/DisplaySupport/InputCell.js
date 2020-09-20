import React, {useState, useEffect} from 'react'

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
	
	//Chaches the value and updates the dataset when you're done editing
	function changeHandler(e){
		setCurrentValue(e.target.value)
	}
	
	//Handles keypresses, for enter or esc keys
	function keyHandler(e){
		if(e.keyCode === 27) { //esc
			setCurrentValue(initalValue)
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
	
	//Check if the input is valid and commit
	async function commitChanges(){
		
		const override = {value: false, newRow: {}}
		
		function customSetRow(newRow){
			props.setRow(newRow)
			override.value = true
			override.newRow = newRow
		}
		
		try{
			if (props.header.compare(props.dataRow[props.header.headerID], currentValue)) { return }
			const newData = JSON.parse(JSON.stringify([...props.dataset.read()]))
			const newCellValue = props.header.parse(currentValue)
			
			newData[props.rowIndex][props.header.headerID] = newCellValue
			
			const res = await props.header.onEdit({
				cellValue: currentValue, 
				row: newData[props.rowIndex], 
				oldCellValue: initalValue, 
				oldRow: props.dataset.read()[props.rowIndex],
				setRow: customSetRow,
			})
			
			if(res || res === undefined){
				if(override.value){
					setCurrentValue(props.header.format(override.newRow[props.header.headerID]))
				} else{
					props.dataset.set(newData)
					setCurrentValue(props.header.format(currentValue))
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
	
	function blurHandler(){
		commitChanges()//Force it to wait untill React finishes all updates before executing
	}
	
	return(<input
		type = 'text'
		className = {'InputCell input ' + validClass}
		onKeyDown = {keyHandler}
		onFocus = {focusHandler}
		onBlur = {blurHandler}
		value = {currentValue}
		onChange = {changeHandler}
	/>)
}