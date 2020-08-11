import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSortAmountUp, faSortAmountDownAlt } from '@fortawesome/free-solid-svg-icons'

export default function SortMenu(props) {
	
	function sortData(e){
		console.log(e.target.value)
	}
	
	return (
		<div className='SortMenu'>
			<button onClick={sortData} className='fullButton sortButton' value={'asc'}>
				Sort Ascending
				<span className = 'sortIcon'><FontAwesomeIcon icon={faSortAmountUp} /></span>
			</button>
			
			<button onClick={sortData} className='fullButton sortButton' value={'desc'}>
				Sort Descending
				<span className='sortIcon'><FontAwesomeIcon icon={faSortAmountDownAlt} /></span>
			</button>
		</div>
	)
}
