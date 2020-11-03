import React from 'react'
import { FreeButton } from '../../touchpoint-ui'

export default function SearchNest(props) {
	return (
		<div>
			<FreeButton onClick={()=>{
				props.setSearchbarValue('I am here')
			}}>Test</FreeButton>
		</div>
	)
}
