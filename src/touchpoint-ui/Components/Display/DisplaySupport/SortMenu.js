import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from '@fortawesome/free-solid-svg-icons'

export default function SortMenu(props) {
	
	function sortData(e){
		props.data.addSortRule({
			headerID: props.header.headerID,
			direction: e.target.value
		})
		
		props.data.sort()
	}
	
	const activeSort = props.data.sortRules.find(s=>s.headerID === props.header.headerID)
	const sortDir = activeSort ? activeSort.direction : ''

	const cancelIcon = <span className = 'sortIcon' onClick={(e)=>{
		props.data.removeSortRule(props.header.headerID)
		e.stopPropagation()
	}
	}>
		<FontAwesomeIcon icon={faTimes} />
	</span>
	
	return (
		<div className='SortMenu'>
			<button onClick={sortData} className='fullButton sortButton' value={'asc'}>
				Sort Ascending
				{sortDir === 'asc' ? cancelIcon : null}
			</button>
			
			<button onClick={sortData} className='fullButton sortButton' value={'desc'}>
				Sort Descending
				{sortDir === 'desc' ? cancelIcon : null}
			</button>
		</div>
	)
}
