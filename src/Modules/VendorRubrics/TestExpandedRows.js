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
			
			<TextBox value={text} onChange={(e => setText(e.target.value))} onEnter={() => {

				const newRow = { ...props.dataRow }
				newRow.projectName = text
				props.setRow(newRow)

			}}/>
			
			<FreeButton onClick = {()=>{
				
				const newRow = {...props.dataRow}
				newRow.projectName = text
				props.setRow(newRow)
				
			}}>Test</FreeButton>
			
		</div>
	)
}