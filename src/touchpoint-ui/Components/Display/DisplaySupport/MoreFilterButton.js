import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import produce from 'immer'

export default function MoreFilterButton(props) {
	
	function addFilter(){
		produce(props.dataHeaders.get(), h =>{
			
			h[props.header.index].addFilter({
				id: props.filterID, 
				value: 'cooling'
			})
		})
		
		props.data.filter()
	}
	
	const closeIcon = <span 
		style ={{position: 'absolute', right: '5px', color: 'var(--lockedTextColor)'}}
		onClick ={(e)=>{ e.stopPropagation() }}
	>
		<FontAwesomeIcon icon = {faTimes}/>
	</span>
	
	return (
		<button onClick = {addFilter}>
			<span style = {{paddingRight: '10px'}}>{props.filter.displayName}</span>
			{closeIcon}
		</button>
	)
}