import React from 'react'
import {useSystem, FreeButton, Popup} from './touchpoint-ui'

export default function DrawerContent() {
	
	const System = useSystem()
	
	return (
		<div>
			<FreeButton
				onClick={() => {
					System.Popup.open(<Popup stripeColor = 'red' title='Hello'>Testing</Popup>)
				}}
			>TestPop</FreeButton>
		</div>
	)
}
