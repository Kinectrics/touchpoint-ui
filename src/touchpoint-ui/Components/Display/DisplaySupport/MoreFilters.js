import React from 'react'
import DataFilter from '../../../DataObjects/DataFilter'
import './MoreFilterButton'
import MoreFilterButton from './MoreFilterButton'

export default function MoreFilters(props) {
	
	const filterList = DataFilter.getFilterTypes()
	
	if (props.header.type !== 'tags' && !props.noFilter){return (
		<div className = 'MoreFilters'>
			
			{Object.keys(filterList).map((f, i)=>{
				
				if (filterList[f].availableTo.includes(props.header.type)){
					
					return <MoreFilterButton 
						key = {'MoreFilterButton' + i}
						filter = {filterList[f]}
						filterID = {f}
						header = {props.header}
						dataHeaders = {props.dataHeaders}
						data = {props.data}
						openTrigger = {props.openTrigger}
					/>
					  
				} else return null
			})}
			
		</div>
	)} else return null
}