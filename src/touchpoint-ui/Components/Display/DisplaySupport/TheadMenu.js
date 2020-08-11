import React from 'react'
import './TheadMenu.css'
import FilterMenu from './FilterMenu'
import MoreFilters from './MoreFilters'
import SortMenu from './SortMenu'


export default function TheadMenu(props) {
	
	
	return (
		<div className = 'TheadMenu'>
			<FilterMenu
				dataHeaders={props.dataHeaders}
				header={props.header}
				data={props.data}
				openTrigger={props.openTrigger}
			/>
			
			<div className = 'sideMenu'>
				
				<SortMenu 
					dataHeaders = {props.dataHeaders}
					data = {props.data}
				/>
				
				<MoreFilters
					header={props.header}
					dataHeaders={props.dataHeaders}
					data={props.data}
					openTrigger={props.openTrigger}
				/>
				
			</div>
		</div>
	)
}
