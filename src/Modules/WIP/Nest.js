import React, {useEffect} from 'react'
import {MainTable, useDataset, InfoTabContainer, InfoTab} from '../../touchpoint-ui'

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
			<InfoTabContainer defaultTab='1'>
				<InfoTab tabTitle='Table' tabID='1'>
					<MainTable
						data={data}
						headers={headers}
						noActive
					/>
				</InfoTab>
				
				<InfoTab tabTitle='Else' tabID='2'>
					Tab 2
				</InfoTab>
				
			</InfoTabContainer>
			
		</div>
	)
}
