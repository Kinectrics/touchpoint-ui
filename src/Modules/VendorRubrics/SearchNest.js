import React from 'react'
import { FreeButton } from '../../touchpoint-ui'

export default function SearchNest(props) {
	return (
		<div>
			<FreeButton onClick={() => {
				props.setSearchBarValue('I am here')
			}}>Test</FreeButton>
		</div>
	)
}
