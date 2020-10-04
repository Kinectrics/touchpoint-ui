import React, {useState} from 'react'
import {Module, Dock, DockIcon, useSystem, FreeButton, Popup, SearchBar, ControlBar, ControlButton, RadioGroup, RadioButton, TextBox, InfoCard, SplitScreen, PopupCard, Tile, MenuButton, useDataset} from '../../touchpoint-ui'
import './ETDB.css'
import { faBars, faExclamationCircle, faFileSignature, faSearch, faLayerGroup, faPlusSquare, faDatabase } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import RubricDetail from '../VendorRubrics/RubricDetail'

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
	
	const data = useDataset(()=>{
		return [...new Array(20)].map((r, idx)=>{
			return {id: idx, selected: idx%4}
		})
	}, {primaryKey: 'id'})
	
	
	///
	const changeHandler = async (val)=>{
		const newRow = { ...data.getActiveRecord() }
		
		newRow.selected = val
		data.setActiveRecord(newRow)
		newRow.selected = val
		data.setActiveRecord(newRow)
	}
	///
	
	
	async function pop(){
		data.refresh()
		System.Popup.open(<PopupCard stripe style={{height: '97%', width: '90%'}}>
			<RubricDetail/>
		</PopupCard>)
	}
	
	const System = useSystem()

	
	return (
		<Module moduleName = 'ETDB'>
			
			{data.getActiveRecord().selected}
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
			
			
			
			<RadioGroup value = {data.getActiveRecord().selected} onChange={changeHandler}>
				<RadioButton value = {1}>1</RadioButton>
				<RadioButton value = {2}>2</RadioButton>
				<RadioButton value = {3}>3</RadioButton>
			</RadioGroup>
			
		</Module>
	)
}