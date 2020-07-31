import React from 'react'
import {useSystem, FreeButton, Popup} from './touchpoint-ui'

export default function DrawerContent() {
	
	const System = useSystem()
	
	return (
		<div>
			<FreeButton
				style={{ position: 'absolute', right: '0' }}
				onClick={() => {
					System.Popup.open(<Popup title='Hello'>Lols</Popup>)
				}}
			>TestPop</FreeButton>
		</div>
	)
}
