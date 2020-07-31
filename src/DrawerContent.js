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
				purpose='negative'
			>TestPop</FreeButton>
			
			
			<FreeButton
				onClick={() => {
					System.Popup.open(<Popup stripeColor = 'green' title='Hello'>
						<FreeButton purpose = 'positive' onClick={()=>{
							System.Popup.close()
							System.Drawer.close()
						}}>Close all</FreeButton>
					</Popup>)
				}}
				purpose='positive'
			>Test 2</FreeButton>
		</div>
	)
}