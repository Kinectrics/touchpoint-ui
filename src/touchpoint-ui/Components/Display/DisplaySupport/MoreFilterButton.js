import React, { useState } from 'react'
import MoreFilterButtonActive from './MoreFilterButtonActive'

export default function MoreFilterButton(props) {
	
	const [active, setActive] = useState(props.header.filterList[props.filterID])
	
	function activate(){
		setActive(true)
	}
	
	if(!active){return(
		
		<button onClick = {activate} className = 'MoreFilterButton'>
			<span style = {{paddingRight: '10px'}}>{props.filter.displayName}</span>
		</button>
		
	)} else{ return(
		
		<MoreFilterButtonActive
			dataHeaders = {props.dataHeaders}
			data = {props.data}
			filter = {props.filter}
			header = {props.header}
		/>
		
	)}
}