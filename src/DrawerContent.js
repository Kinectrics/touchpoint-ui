import React from 'react'
import {useSystem, FreeButton, PopupCard, AppDrawer, Tile} from './touchpoint-ui'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDatabase, faTimes, faFeather, faGamepad, faPager } from '@fortawesome/free-solid-svg-icons'

export default function DrawerContent() {
	
	const System = useSystem()
	
	return (
		<AppDrawer>
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
			
			<Tile title='TileDrawer' locked>
				<FontAwesomeIcon icon={faDatabase} />
			</Tile>
			
			<Tile title='TileDrawer'>
				<FontAwesomeIcon icon={faTimes} title='Tile' />
			</Tile>
			
			<Tile title='TileDrawer'>
				<FontAwesomeIcon icon={faFeather} title='Tile' />
			</Tile>
			
			<Tile title='TileDrawer'>
				<FontAwesomeIcon icon={faGamepad} title='Tile' />
			</Tile>
			
			<Tile title='TileDrawer'>
				<FontAwesomeIcon icon={faPager} title='Tile' />
			</Tile >
			
		</AppDrawer>
	)
}