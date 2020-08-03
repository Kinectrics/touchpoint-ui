import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import produce from 'immer'

export default function MoreFilterButtonActive(props) {
	
	
	function addFilter() {
		//Open Popup. If the values are good run the produce function below (in the popup) if not, do nothing

		props.dataHeaders.set(produce(props.dataHeaders.get(), h => {
			h[props.header.index].addFilter({
				id: props.filterID,
				value: '9' //#TODO Values
			})
		}))

		props.data.filter()
	}
	
	
	function closeHandler(e) {
		e.stopPropagation()

		props.dataHeaders.set(produce(props.dataHeaders.get(), h => {
			h[props.header.index].removeFilter(props.filterID)
		}))

		props.data.filter()
	}
	
	
	function blurHandler(e) {
		console.log('blur')
	}
	
	
	return (
		<button className='activeFilterButton disabled' onBlur={blurHandler}>
			
			<span style={{ paddingRight: '10px' }}>{props.filter.displayName}</span>
			
			<span
				className='closeIcon'
				onClick={closeHandler}
			>
				<FontAwesomeIcon icon={faTimes} />
			</span>
		</button>
	)
}
