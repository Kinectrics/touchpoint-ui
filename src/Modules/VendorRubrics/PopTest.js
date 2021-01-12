import React from 'react'
import { PopupCard } from '../../touchpoint-ui'

export default function PopTest(props) {
	console.log(props)
	return (
		<PopupCard>
			{props.words}
		</PopupCard>
	)
}
