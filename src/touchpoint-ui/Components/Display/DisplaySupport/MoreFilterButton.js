import React, { useState } from 'react'
import MoreFilterButtonActive from './MoreFilterButtonActive'

export default function MoreFilterButton(props) {
	
	const [active, setActive] = useState(props.header.filterList[props.filterID] ? true : false)
	
	function activate(){
		console.log('test')
		// setTimeout( ()=>{
			setActive(!active)
		// }, 1)
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
			filterID = {props.filterID}
			header = {props.header}
			setActive = {setActive}
		/>
		
	)}
}