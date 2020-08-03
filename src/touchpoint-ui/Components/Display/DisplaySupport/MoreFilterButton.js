import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from '@fortawesome/free-solid-svg-icons'

export default function MoreFilterButton(props) {
	
	const closeIcon = <span 
		style ={{position: 'absolute', right: '5px', color: 'var(--lockedTextColor)'}}
		onClick ={(e)=>{ e.stopPropagation() }}
	>
		<FontAwesomeIcon icon = {faTimes}/>
	</span>
	
	return (
		<button>
			<span style = {{paddingRight: '10px'}}>{props.filter.displayName}</span>
			
			{closeIcon}
		</button>
	)
}