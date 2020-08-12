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
	
	const defaultChecked = radioData.defaultValue === props.value
	
	return (
		<span className={"RadioButton flexY "+ lockedClass}>
			
			<input
				type="radio"
				className={'input ' + lockedClass}
				defaultChecked={defaultChecked}
				onClick={clickHandler}
				name = {radioData.groupName}
				value = {props.value}
				id = {id}
				style = {props.style}
				checked = {radioData.value !== undefined ? (radioData.value === props.value) : undefined}
				readOnly={radioData.value !== undefined}
			/>
			<label 
				className = {lockedClass}
				htmlFor = {id}
			>
				{props.labelValue}	
			</label>
			
		</span>
	)
}

RadioButton.propTypes = {
	labelValue: PropTypes.string,
	value: PropTypes.any,
	style: PropTypes.object,
}