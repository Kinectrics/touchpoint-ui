import React from 'react'
import { FreeButton, TextBox } from '../../touchpoint-ui'
import { useState } from 'react'

export default function TestExpandedRows(props) {
	
	const [text, setText] = useState('')
	
	return (
		<div style={{
			padding: '10px'
		}}>
			Expanded Rows Test
			<br/>
			{props.dataRow.vendor}
			
			<TextBox value={text} onChange = {(e=>setText(e.target.value))}/>
			
			<FreeButton onClick = {()=>{
				
				const newRow = {...props.dataRow}
				newRow.vendor = text
				props.setDataRow(newRow)
				
			}}>Test</FreeButton>
			
		</div>
	)
}