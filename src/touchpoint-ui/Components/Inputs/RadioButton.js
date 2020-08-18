import React, {useContext, useState} from 'react'
import radioContext from '../../Contexts/RadioContext'
import './InputStyles.css'
import PropTypes from 'prop-types'
import './RadioButton.css'
import {v4 as uuid} from 'uuid'

export default function RadioButton(props) {
	
	const radioData = useContext(radioContext)
	const [id] = useState(uuid())
	
	let lockedClass = ''
	if (radioData.locked) { lockedClass = 'locked ' }

	//handles the clicking of the radio button - for locked radio buttons
	function clickHandler(e) {
		if (radioData.locked) {
			e.preventDefault()
			
		} else{
			radioData.onChange(props.value)
		}
	}
	
	return (
		<span className={"RadioButton flexY " + lockedClass} style={props.style}>
			
			<input
				type="radio"
				className={'input ' + lockedClass}
				defaultChecked={radioData.value !== undefined ? undefined : radioData.defaultValue === props.value}
				onClick={clickHandler}
				name = {radioData.groupName}
				value = {props.value}
				style={props.buttonStyle}
				id = {id}
				checked = {radioData.value !== undefined ? (radioData.value === props.value) : undefined}
				readOnly={radioData.value !== undefined}
			/>
			<label 
				className = {lockedClass}
				htmlFor = {id}
				style={props.labelStyle}
			>
				{props.children}
				{props.labelValue}
			</label>
			
		</span>
	)
}

RadioButton.propTypes = {
	value: PropTypes.any,
	style: PropTypes.object,
	labelStyle: PropTypes.object,
	buttonStyle: PropTypes.object,
}