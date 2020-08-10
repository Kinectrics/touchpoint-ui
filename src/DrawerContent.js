import React from 'react'
import {useSystem, FreeButton, PopupCard} from './touchpoint-ui'

export default function DrawerContent() {
	
	const System = useSystem()
	
	return (
		<div>
			<FreeButton
				onClick={() => {
					System.Popup.open(<PopupCard stripeColor = 'red' title='Hello'>Testing</PopupCard>)
				}}
				purpose='negative'
			>TestPop</FreeButton>
			
			
			<FreeButton
				onClick={() => {
					System.Popup.open(<PopupCard stripeColor = 'green' title='Hello'>
						<FreeButton purpose = 'positive' onClick={()=>{
							System.Popup.close()
							System.Drawer.close()
						}}>Close all</FreeButton>
					</PopupCard>)
				}}
				purpose='positive'
			>Test 2</FreeButton>
		</div>
	)
}