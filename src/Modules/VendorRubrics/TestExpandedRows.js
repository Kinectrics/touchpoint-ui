import React from 'react'
import { MainTable } from '../../touchpoint-ui'

export default function TestExpandedRows(props) {
	
	//Conditional formatting for the status
	const statusStyle = (cellValue) => {
		switch (cellValue) {
			case 'Complete': return { color: 'white', backgroundColor: '#66CD00' }
			case 'Pending Approval': return { color: 'white', backgroundColor: '#EE0000' }
			case 'In Progress': return { color: 'white', backgroundColor: '#00ccff' }
			default: return { color: 'white', backgroundColor: 'blue' }
		}
	}
	
	const dataHeaders = [
		{ headerID: 'date', displayName: 'Date', width: 200, type: 'date' },
		{ headerID: 'status', displayName: 'Status', width: 300, styling: statusStyle, required: true },
		{ headerID: 'notes', displayName: 'Notes', width: 600, required: true },
	]

	//If the activerecorsd is undefined yet, use an empty array for now
	const statusLogData = props.row && props.row.statusLog ? props.row.statusLog : []

	return (

		<div>
			<MainTable
				data={statusLogData}
				headers={dataHeaders}
				pageSize={100}
				noActive
			/>
		</div>

	)
}