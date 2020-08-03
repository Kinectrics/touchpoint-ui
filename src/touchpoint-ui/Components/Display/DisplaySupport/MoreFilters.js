import React from 'react'
import DataFilter from '../../../DataObjects/DataFilter'
import './MoreFilterButton'
import MoreFilterButton from './MoreFilterButton'

export default function MoreFilters(props) {
	
	const filterList = DataFilter.getFilterTypes()
	
	return (
		<div>
			
			{Object.keys(filterList).map((f, i)=>{
				
				if (filterList[f].availableTo.includes(props.header.type)){
					return <MoreFilterButton 
						key = {'MoreFilterButton' + i}
						filter = { filterList[f] }
					/>
					
				} else return null
			})}
			
		</div>
	)
}
