import React from 'react'
import DataFilter from '../../../DataObjects/DataFilter'
import './MoreFilterButton'
import MoreFilterButton from './MoreFilterButton'
import './MoreFilters.css'

export default function MoreFilters(props) {
	
	const filterList = DataFilter.getFilterTypes()
	
	return (
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
	)
}