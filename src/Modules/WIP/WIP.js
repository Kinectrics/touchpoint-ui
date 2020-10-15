import React, {useState} from 'react'
import { Module, Dock, ControlBar, CoreButton, DockIcon, ControlledTabContainer, SplitScreen, FreeButton, useSystem, PopupCard, useDataset, MainTable, InfoTabContainer, InfoCard, InfoTab, MenuButton, AppToolbar, SearchBar } from '../../touchpoint-ui'
import { faCopy, faSave, faCogs, faTimesCircle, faPrint, faSync, faHome, faDatabase } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Nest from './Nest'
import {csqQuery, unplannedQuery} from '../../SQLSimulator'


export default function WIP() {
	
	const [activeTab, setActiveTab] = useState('tab2')

	const buttonStyle = {height: '100%', marginRight: '60px'}
	
	function styler(cell, row) {
		const final = {
			backgroundColor: 'green',
			color: 'white'
		}
		const choices = {
			['CSVN Approved']: { backgroundColor: 'orange', color: 'white' },
			['At Risk']: { backgroundColor: 'red', color: 'white' },
		}
		return choices[cell] ? choices[cell] : final
	}

	const data = useDataset(csqQuery, { primaryKey: 'id' })

	const headers = [
		{ headerID: 'commitment', displayName: 'Commitment', width: 120, type: 'date' },
		{ headerID: 'finish', displayName: 'Finish', width: 120, type: 'date' },
		{ headerID: 'pcs', displayName: 'PCS', width: 200 },
		{ headerID: 'pm', displayName: 'Project Manager', width: 200 },
		{ headerID: 'programManager', displayName: 'Program Manager', width: 200 },
		{ headerID: 'state', displayName: 'Current State', width: 200, styling: styler, required: true },
		{ headerID: 'notes', displayName: 'My Notes', width: 300, onEdit: () => Math.random() > 0.5},
		{ headerID: 'csvnDate', displayName: 'CSVN Date', width: 150, type: 'date' },
	]


	return (
		<Module>
			<Dock style={{ paddingTop: '20px' }}>
				<DockIcon title={'Home'} faIcon={faHome} style={{ marginTop: '20px' }} notifications={45} />
				<DockIcon title={'Planned'} faIcon={faDatabase} style={{ marginTop: '20px' }} onClick={()=>setActiveTab('tab1')}/>
				<DockIcon title={'Unplanned'} faIcon={faSave} style={{ marginTop: '20px' }} onClick={() => setActiveTab('tab2')}/>
			</Dock>

			<ControlBar searchBar={true}>
				<MenuButton menuContent={<div>
					<button>Hello</button>
					<button>Hello</button>
					<button>Hello</button>
				</div>}>Menu</MenuButton>
				
				<CoreButton style={buttonStyle} onClick={()=>{
					data.refresh()
				}}> <FontAwesomeIcon icon={faSync} /> Refresh</CoreButton>
				<MenuButton style={buttonStyle} menuContent={<div>
					<button>Hello</button>
					<button>Hello</button>
					<button>Hello</button>
				</div>}>Menu</MenuButton>
				<CoreButton style={buttonStyle}><FontAwesomeIcon icon={faTimesCircle} /> Set Active</CoreButton>
				<CoreButton style={buttonStyle}><FontAwesomeIcon icon={faPrint} /> Print</CoreButton>
				<MenuButton menuContent={<div>
					<button>Hello</button>
					<button>Hello</button>
					<button>Hello</button>
				</div>}>Menu</MenuButton>
			</ControlBar>

	
			<div style={{height: 'calc(100% - var(--controlBarHeight))'}}>

				<MainTable
					pageSize={50}
					headers={headers}
					data={data}
					settingsID={'WIP_Table_1'}
					searchable
				/>

			</div>

		</Module>
	)
}