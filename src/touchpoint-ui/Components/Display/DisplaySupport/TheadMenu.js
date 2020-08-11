import React from 'react'
import './TheadMenu.css'
import FilterMenu from './FilterMenu'
import MoreFilters from './MoreFilters'


export default function TheadMenu(props) {
	
	
	return (
		<div className = 'TheadMenu'>
			<FilterMenu
				dataHeaders={props.dataHeaders}
				header={props.header}
				data={props.data}
				openTrigger={props.openTrigger}
			/>
			
			<MoreFilters
				header={props.header}
				dataHeaders={props.dataHeaders}
				data={props.data}
				openTrigger={props.openTrigger}
			/>
		</div>
	)
}
