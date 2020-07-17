import React, {useContext} from 'react'
import lockedContext from '../../Contexts/LockedContext'
import './InputStyles.css'

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
			/>
			<span className="checkmark"></span>
			{props.label}
		</label>
	)
}