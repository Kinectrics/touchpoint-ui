import React, {useContext} from 'react'
import lockedContext from '../../Contexts/LockedContext'
import './InputStyles.css'
import PropTypes from 'prop-types'


export default function CheckBox(props) {
	
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
	
	//handles the clicking of the checkbox - for locked checkboxes
	function clickHandler(e){
		if(locked){
			e.preventDefault()
		}
	}
	
	return (
		<label className="CheckBox flexY">
			<input 
				type="checkbox" 
				className={'input ' + lockedClass}
				defaultChecked={props.defaultValue}
				onChange={changeHandler}
				onClick={clickHandler}
				style = {props.style}
				checked = {props.checked}
			/>
			<span className="checkmark"></span>
			{props.label}
		</label>
	)
}

CheckBox.propTypes = {
	locked: PropTypes.bool,
	hidden: PropTypes.bool,
	onChange: PropTypes.func,
	defaultValue: PropTypes.bool,
	style: PropTypes.object,
	checked: PropTypes.bool,
}