import React, {useState, useEffect} from 'react'

export default function InputCell(props) {
	
	const [initalValue, setInitialValue] = useState(
		props.dataRow[props.header.headerID] ? props.dataRow[props.header.headerID] : ''
	)
	
	const [currentValue, setCurrentValue] = useState(
		props.dataRow[props.header.headerID] ? props.dataRow[props.header.headerID] : ''
	)
	
	// Update the value if the data is changed by an outside source
	useEffect(() => {
		const newVal = props.dataRow[props.header.headerID] ? props.dataRow[props.header.headerID] : ''
		setCurrentValue(newVal)
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
	
	//Check if the input is valid and commit
	function commitChanges(){
		if (props.dataRow[props.header.headerID] !== currentValue){
			
			const newData = JSON.parse(JSON.stringify([...props.dataset.read()]))
			newData[props.rowIndex][props.header.headerID] = currentValue
			
			const objection = props.header.onEdit(currentValue, newData[props.rowIndex])
			
			if(objection){
				setCurrentValue(initalValue)
				flashRed()
			} else{
				props.dataset.set(newData)
			}
		}
	}
	
	function blurHandler(){
		commitChanges()//Force it to wait untill React finishes all updates before executing
	}
	
	return <input
		type = 'text'
		className = {'InputCell input ' + validClass}
		onKeyDown = {keyHandler}
		onFocus = {focusHandler}
		onBlur = {blurHandler}
		value = {currentValue}
		onChange = {changeHandler}
	/>
}