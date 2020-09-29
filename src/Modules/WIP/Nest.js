import React, {useEffect} from 'react'
import {MainTable, useDataset} from '../../touchpoint-ui'

export default function Nest(props) {
	
	const headers = [
		{headerID: 'number', displayName: 'CID Number', width: 200, onEdit: ()=>true},
		{headerID: 'desc', displayName: 'Description', width: 400}
	]
	
	const data = useDataset(()=>{
		return props.row.cids
	}, {primaryKey: 'id'})
	
	useEffect(()=>{
		data.refresh()
	}, [props.row])
	
	return (
		<div>
			
			<MainTable
				data = {data}
				headers={headers}
			/>
			
		</div>
	)
}
