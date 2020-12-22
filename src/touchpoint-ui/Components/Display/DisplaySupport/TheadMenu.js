import React from 'react'
import './TheadMenu.css'
import FilterMenu from './FilterMenu'
import MoreFilters from './MoreFilters'
import SortMenu from './SortMenu'


export default function TheadMenu(props) {
	
	
	return (
		<div className = {'TheadMenu ' + 'tpui' + props.header.type}>
			<FilterMenu
				dataHeaders={props.dataHeaders}
				header={props.header}
				data={props.data}
				openTrigger={props.openTrigger}
				noFilter = {props.noFilter}
			/>
			
			<div className='sideMenu' style={{ width: props.noFilter ? '100%' : null }}>
				
				<SortMenu 
					data = {props.data}
					header = {props.header}
					dataHeaders = {props.dataHeaders}
					noSort = {props.noSort}
				/>
				
				<MoreFilters
					header={props.header}
					dataHeaders={props.dataHeaders}
					data={props.data}
					openTrigger={props.openTrigger}
					noFilter={props.noFilter}
				/>
				
			</div>
		</div>
	)
}
