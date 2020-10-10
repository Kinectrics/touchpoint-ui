import React from 'react'
import { ConfirmButton } from '../../touchpoint-ui'

export default function AddMenu() {
	return (
		<div>
			hello menu
			<ConfirmButton
				content={'hello'}
				expandedContent={'Goodbye'}
			/>
		</div>
	)
}
