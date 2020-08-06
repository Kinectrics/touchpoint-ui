import React, {useState} from 'react'
import PropTypes from 'prop-types'
import './InputCell.css'

export default function InputCell(props) {
	
	const [initalValue, setInitialValue] = useState(props.defaultValue)
	
	//When you focus on an item, the value is saved. if you escape, its restored
	function focusHandler(e){
		setInitialValue(e.target.value)
	}
	
	//Handles keypresses, for enter or esc keys
	function keyHandler(e){
		if(e.keyCode === 27) { //esc
			
			e.target.value = initalValue
			e.target.blur()
			
		} else if(e.keyCode === 13){ //enter
			
			console.log('You pressed the enter key!')
			
		}
	}
	
	//Handles changes (commit changes)
	function changeHandler(e){
		
	}
	

		
	return <input
		className = 'InputCell cellTextBox input'
		defaultValue={props.defaultValue}
		onKeyDown = {keyHandler}
		onFocus = {focusHandler}
	/>
	
	
}

//Proptypes
InputCell.propTypes = {
	defaultValue: PropTypes.string,
	dataRow: PropTypes.object,
}