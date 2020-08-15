import React from 'react'
import {MainTable, useHeaders} from '../../touchpoint-ui'

export default function StatusLog(props) {
	
	const dataHeaders = [
		{headerID:'date', displayName: 'Date', width: 200},
		{headerID:'status',displayName:'Status', width: 300, styling: props.statusStyle, required: true},
		{headerID:'notes', displayName:'Notes', width: 600, required: true},
	]
	
	//If the activerecorsd is undefined yet, use an empty array for now
	let statusLogData = []
	if(props.dataRow.statusLog){statusLogData = props.dataRow.statusLog}
	
	return (
		
		<div className='StatusLog'>
			<MainTable 
				data = {statusLogData}
				headers={dataHeaders}
				pageSize={100}
			/>
		</div>
		
	)
}