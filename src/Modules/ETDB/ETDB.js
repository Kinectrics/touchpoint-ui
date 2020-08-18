import React, {useState} from 'react'
import {Module, Dock, DockIcon, useSystem, FreeButton, Popup, SearchBar, ControlBar, ControlButton, RadioGroup, RadioButton} from '../../touchpoint-ui'
import './ETDB.css'
import { faBars, faExclamationCircle, faFileSignature, faSearch, faLayerGroup, faPlusSquare } from '@fortawesome/free-solid-svg-icons'

export default function ETDB() {
		
	const System = useSystem()
	
	const [radio, setRadio] = useState(1)
	
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
			
			<RadioGroup value={radio} onChange={setRadio}>
				<RadioButton value={1}>1</RadioButton>
				<RadioButton value={2}>2</RadioButton>
				<RadioButton value={3}>3</RadioButton>
				<RadioButton value={4}>4</RadioButton>
			</RadioGroup>
			
		</Module>
	)
}