import React from 'react'
import {MainTable, DataHeader, DataType, useHeaders} from '../../touchpoint-ui'

export default function StatusLog(props) {
	
	
	const dataHeaders = useHeaders([
		new DataHeader('date','Date',5, new DataType('string')),
		new DataHeader('status','Status',10, new DataType('string'),true, props.statusStyle),
		new DataHeader('notes','Notes',30, new DataType('string'),true),
	])
	
	//If the activerecorsd is undefined yet, use an empty array for now
	let statusLogData = []
	if(props.dataRow.statusLog){statusLogData = props.dataRow.statusLog}
	
	return (
		
		<div className='StatusLog'>
			
			<MainTable 
				data = {statusLogData}
				dataHeaders={dataHeaders}
				pageSize={100}
			/>
			
		</div>
		
	)
}