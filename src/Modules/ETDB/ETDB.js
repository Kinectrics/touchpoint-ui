import React, {useState} from 'react'
import {Module, Dock, DockIcon, useSystem, FreeButton, Popup, SearchBar, ControlBar, ControlButton, RadioGroup, RadioButton, TextBox, InfoCard, SplitScreen, PopupCard, Tile, MenuButton} from '../../touchpoint-ui'
import './ETDB.css'
import { faBars, faExclamationCircle, faFileSignature, faSearch, faLayerGroup, faPlusSquare, faDatabase } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function TestComp(props){
	
	const [count, setCount] = useState(0)
	const System = useSystem()
	
	return(
		<PopupCard>
			<FreeButton onClick={()=>{
				System.Popup.open(<PopupCard>Hi</PopupCard>)
			}}>TestNest</FreeButton>
			<h2>{count}</h2>
			<FreeButton onClick={()=>setCount(count+1)}>+</FreeButton>
			<FreeButton onClick={() => setCount(count - 1)}>-</FreeButton>
		</PopupCard>
	)
}

export default function ETDB() {
		
	const System = useSystem()
	
	function pop(){
		System.Popup.open(<TestComp System={System}/>)
	}
	
	return (
		<Module moduleName = 'ETDB'>
			
			
			<Dock locked = {false}>
				
				<DockIcon faIcon={faBars} style={{marginBottom: '50px'}} onClick={()=>{
					System.Drawer.open()
				}}/>
				
				<DockIcon menuContent={
					<div>
						<button>Hello</button>
						<button>Hello</button>
						<button>Hello</button>
						<button>Hello</button>
					</div>
				} faIcon={faFileSignature} title={'CSQ'} notifications={20}/>
				<DockIcon faIcon={faExclamationCircle} title={'Emergent'} notifications={200}/>
				<DockIcon faIcon={faLayerGroup} title={'All TDS'}/>
				<DockIcon faIcon={faPlusSquare} title={'New TDS'} style={{ marginTop: '50px' }}/>
				<DockIcon faIcon={faSearch} title={'Lookup'} />
			</Dock>
			
			<FreeButton onClick={pop}>
				Pop
			</FreeButton>
			
			<Tile title='DB Time' notifications='72'>
				<FontAwesomeIcon icon={faDatabase}/>
			</Tile>
			
			<MenuButton style={{
				backgroundColor: 'white', borderRadius: '10px', height: '50px', width: '50px'
			}}  menuContent={
				<div>
					<button>Hello</button>
					<button>Hello</button>
					<button>Hello</button>
					<button>Hello</button>
				</div>
			}>Menu</MenuButton>
			
		</Module>
	)
}