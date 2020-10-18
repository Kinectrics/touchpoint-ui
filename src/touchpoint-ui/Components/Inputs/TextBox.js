import React, {useContext} from 'react'
import lockedContext from '../../Contexts/LockedContext'
import PropTypes from 'prop-types'

export default function TextBox(props) {
	
	//deccides if the component is locked based on props and parents in the tree
	const lockedFromAbove = useContext(lockedContext)
	const locked = props.locked || (lockedFromAbove && props.locked ===undefined)
		
	let lockedClass = ''
	if (locked){lockedClass = 'locked '}
	
	//handles the onChange event. Only fires if component is not locked
	function changeHandler(e){
		if(!locked && props.onChange){
			props.onChange(e)
		} 
	}
	
	function blurHandler(e){
		if(!locked && props.onBlur){
			props.onBlur(e)
		} 
	}
	
	//For the onEnter event
	function keyPressHandler(e){
		if(!locked && e.key === 'Enter' && props.onEnter !==undefined){
			props.onEnter(e)
		} 
	}
	
	return (
		<input 
			type={props.type ? props.type : "text"}
			className={"input TextBox " + lockedClass + ' ' + props.className}
			defaultValue={props.defaultValue}
			onChange={changeHandler}
			readOnly={locked}
			onKeyPress={keyPressHandler}
			placeholder = {props.placeholder}
			onBlur = {blurHandler}
			ref = {props.inputRef}
			autoFocus = {props.autoFocus}
			style = {props.style}
			value = {props.value}
			maxLength={props.maxLength}
			tabIndex={props.tabIndex}
		/>
	)
}

//Proptypes
TextBox.propTypes = {
	locked: PropTypes.bool,
	defaultValue: PropTypes.string,
	onChange: PropTypes.func,
	hidden: PropTypes.bool,
	onEnter: PropTypes.func,
	placeholder: PropTypes.string,
	className: PropTypes.string,
	value: PropTypes.string,
	inputRef: PropTypes.object,
	autoFocus: PropTypes.bool,
	value: PropTypes.string,
	onEscape: PropTypes.func,
	type: PropTypes.string,
	maxLength:PropTypes.number,
	tabIndex: PropTypes.any,
}

