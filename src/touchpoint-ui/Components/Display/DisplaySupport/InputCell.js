import React, {useState, useEffect, useRef} from 'react'

export default function InputCell(props) {
	
	const [initalValue, setInitialValue] = useState(
		props.dataRow[props.header.headerID] ? props.dataRow[props.header.headerID] : ''
	)
	
	const [currentValue, setCurrentValue] = useState(
		props.dataRow[props.header.headerID] ? props.dataRow[props.header.headerID] : ''
	)
	
	const [errorMsg, setErrorMsg] = useState(null)
	
	const inputRef = useRef()
	
	useEffect(() => {
		const newVal = props.dataRow[props.header.headerID] ? props.dataRow[props.header.headerID] : ''
		setCurrentValue(newVal)
		setInitialValue(newVal)
		
	}, [ props.dataRow[props.header.headerID] ])
	
	//Remove errors on refresh
	useEffect(()=>{
		setErrorMsg(null)
	}, [props.dataset.lastResolved])
	
	//When you focus on an item, the value is saved. if you escape, its restored
	function focusHandler(e){
		setInitialValue(e.target.value)
	}
	
	//Chaches the value and updates the dataset when you're done editing
	function changeHandler(e){
		setCurrentValue(e.target.value)
		setErrorMsg(null)
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
	
	//Check if the input is valid and commit
	function commitChanges(){
		const newValue = inputRef.current.value
		
		if (props.dataRow[props.header.headerID] !== inputRef.current.value){
			
			const newData = JSON.parse(JSON.stringify([...props.dataset.read()]))
			newData[props.rowIndex][props.header.headerID] = newValue
			
			const validation = props.header.onEdit(newValue, newData[props.rowIndex])
			setErrorMsg(validation)
			
			if(!errorMsg){
				props.dataset.set(newData)
			}
		}
	}
	
	function blurHandler(){
		setTimeout(commitChanges) //Force it to wait untill React finishes all updates before executing
	}
	
	const validClass = errorMsg ? 'invalid' : ''
	
	return <input
		type = 'text'
		className = {'InputCell input ' + validClass}
		onKeyDown = {keyHandler}
		onFocus = {focusHandler}
		onBlur = {blurHandler}
		value = {currentValue}
		onChange = {changeHandler}
		ref = {inputRef}
		title = {errorMsg ? errorMsg : null}
	/>
	
	
}