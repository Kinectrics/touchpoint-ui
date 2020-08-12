import React, {useState, useEffect} from 'react'

export default function InputCell(props) {
	
	const [commitTrigger, setCommitTrigger] = useState(false)
	
	const [initalValue, setInitialValue] = useState(
		props.dataRow[props.header.headerID] ? props.dataRow[props.header.headerID] : ''
	)
	const [currentValue, setCurrentValue] = useState(
		props.dataRow[props.header.headerID] ? props.dataRow[props.header.headerID] : ''
	)
	
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
	
	
	//sets the dataset value to match
	function updateDataset(){
		const newData = [...props.dataset.read()]
		newData[props.rowIndex][props.header.headerID] = currentValue
		props.dataset.set(newData)
	}
	
	//Handles keypresses, for enter or esc keys
	function keyHandler(e){
		if(e.keyCode === 27) { //esc
			setCurrentValue(initalValue)
			e.target.blur()
			setCommitTrigger(false)
		} else if(e.keyCode === 13){ //enter
			setCommitTrigger(true)
		}
	}
	
	//Check if the input is valid and commit
	if(commitTrigger){
		setCommitTrigger(false)
		setTimeout(updateDataset, 0) //Force it to wait untill React finishes all updates before executing
	}
	
	return <input
		type = 'text'
		className = 'InputCell input'
		onKeyDown = {keyHandler}
		onFocus = {focusHandler}
		onBlur = {()=>setCommitTrigger(true)}
		value = {currentValue}
		onChange = {changeHandler}
	/>
	
	
}