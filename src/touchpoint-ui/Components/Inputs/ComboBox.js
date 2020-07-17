import React, {useContext} from 'react'
import lockedContext from '../../Contexts/LockedContext'
import './ComboBox.css'
import './InputStyles.css'

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
				className={"ComboBox input " + lockedClass} 
				defaultValue={props.defaultValue}
				onChange = {changeHandler}
				disabled = {locked}
			>
				{kids}
			</select>
	)}
}
