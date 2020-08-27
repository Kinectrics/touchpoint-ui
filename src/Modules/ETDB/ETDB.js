import React from 'react'
import {Module, Dock, DockIcon, useSystem, FreeButton, Popup, SearchBar, ControlBar, ControlButton, RadioGroup, RadioButton, TextBox} from '../../touchpoint-ui'
import './ETDB.css'
import { faBars, faExclamationCircle, faFileSignature, faSearch, faLayerGroup, faPlusSquare } from '@fortawesome/free-solid-svg-icons'

export default function ETDB() {
		
	const System = useSystem()
	
	return (
		<Module moduleName = 'ETDB'>
			
			<Dock locked = {false}>
				
				<DockIcon faIcon={faBars} style={{marginBottom: '50px'}} onClick={()=>{
					System.Drawer.open()
				}}/>
				
				<DockIcon faIcon={faFileSignature} title={'CSQ'} notifications={20}/>
				<DockIcon faIcon={faExclamationCircle} title={'Emergent'} notifications={200}/>
				<DockIcon faIcon={faLayerGroup} title={'All TDS'}/>
				<DockIcon faIcon={faPlusSquare} title={'New TDS'} style={{ marginTop: '50px' }}/>
				<DockIcon faIcon={faSearch} title={'Lookup'} />
			</Dock>
			
			<TextBox />
			
		</Module>
	)
}