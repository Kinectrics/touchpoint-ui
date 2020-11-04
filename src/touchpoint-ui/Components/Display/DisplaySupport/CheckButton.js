import React from 'react'
import Proptypes from 'prop-types'
import {v4 as uuid} from 'uuid'

export default function CheckButton(props) {
	
	const checkID = uuid()
	
	function clickHandler(e, id) {
		if(!props.disabled){
			if(props.onClick){props.onClick(e.target.checked, props.value)}
		}
	}
	
	const spanStyle = {
		textAlign: 'left',
		paddingLeft: '7px',
	}
	
	return (<div
		style ={{color: 'var(--mainTextColor)'}}
	>

		<input
			onClick={(e) => clickHandler(e, checkID)}
			type='checkbox'
			defaultChecked={props.defaultChecked}
			id={checkID}
			value={props.value}
			style={{cursor: 'pointer', }}
			disabled = {props.disabled}
			checked = {props.checked}
			readOnly = {props.checked !== undefined ? true : false}
		/>
		<span style={spanStyle}>{props.children}</span>
		

	</div>)
	
}


CheckButton.propTypes={
	defaultChecked: Proptypes.bool,
	value: Proptypes.any,
	label: Proptypes.string,
	onClick: Proptypes.func,
	disabled: Proptypes.bool,
	checked: Proptypes.bool,
}