import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import produce from 'immer'

export default function MoreFilterButton(props) {
	
	function addFilter(){
		props.dataHeaders.set(produce(props.dataHeaders.get(), h =>{
			
			h[props.header.index].addFilter({
				id: props.filterID, 
				value: 'cooling'
			})
		}))
		
		props.data.filter()
	}
	
	
	function removeFilter(e){
		e.stopPropagation()
		
		props.dataHeaders.set(produce(props.dataHeaders.get(), h => {
			h[props.header.index].removeFilter(props.filterID)
		}))

		props.data.filter()
	}
	
	const closeIcon = <span 
		style ={{position: 'absolute', right: '5px', color: 'var(--lockedTextColor)'}}
		onClick ={removeFilter}
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