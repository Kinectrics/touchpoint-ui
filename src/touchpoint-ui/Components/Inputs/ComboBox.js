import React, {useContext} from 'react'
import lockedContext from '../../Contexts/LockedContext'
import './ComboBox.css'
import PropTypes from 'prop-types'

export default function ComboBox(props) {
	
	//deccides if the component is locked based on props and parents in the tree
	const lockedFromAbove = useContext(lockedContext)
	const locked = props.locked || (lockedFromAbove && props.locked ===undefined)
		
	let lockedClass = ''
	if (locked){lockedClass = 'locked '}
	
	//handles the onChange event. Only fires if component is not locked
	function changeHandler(e){
		if(!locked && props.onChange !== undefined){
			props.onChange(e)
		} 
	}
	
	//if its locked, only allow the default option
	let kids = props.children
	if(locked){
		kids = <option>{props.defaultValue}</option>
	}
	
	//If it's hidden, don't render anything
	if (props.hidden){return null} else{return(
			<select 
				className={"ComboBox input " + lockedClass + ' ' + props.className} 
				defaultValue={props.defaultValue}
				onChange = {changeHandler}
				disabled = {locked}
				style = {props.style}
				value = {props.value}
				tabIndex = {props.tabIndex}
				ref={props.inputRef}
			>
				{kids}
			</select>
	)}
}

//
ComboBox.propTypes = {
	hidden: PropTypes.bool,
	locked: PropTypes.bool,
	style: PropTypes.object,
	value: PropTypes.string,
	className: PropTypes.string,
	defaultValue: PropTypes.string,
	tabIndex: PropTypes.any,
	inputRef: PropTypes.object,
}