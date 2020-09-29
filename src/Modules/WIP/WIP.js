import React from 'react'
import { Module, Dock, ControlBar, CoreButton, DockIcon, SplitScreen, FreeButton, useSystem, PopupCard, useDataset, MainTable, InfoTabContainer, InfoCard, InfoTab, MenuButton, AppToolbar, SearchBar } from '../../touchpoint-ui'
import { faCopy, faSave, faCogs, faTimesCircle, faPrint, faSync, faHome, faDatabase } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Nest from './Nest'
import {csqQuery, unplannedQuery} from '../../SQLSimulator'


export default function WIP() {

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
	const data2 = useDataset(unplannedQuery, { primaryKey: 'id' })

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

	const headers2 = [
		{ headerID: 'tds', displayName: 'TDS #', width: 120 },
		{ headerID: 'scopetitle', displayName: 'Scope', width: 120 },
		{ headerID: 'dateadded', displayName: 'Date Added', width: 120, type: 'date' },
		{ headerID: 'addedby', displayName: 'Added By', width: 200 },
		{ headerID: 'comments', displayName: 'Comments', width: 500 },
	]

	return (
		<Module>
			<Dock style={{ paddingTop: '20px' }}>
				<DockIcon title={'Home'} faIcon={faHome} style={{ marginTop: '20px' }} notifications={45} />
				<DockIcon title={'Query Editor'} faIcon={faDatabase} style={{ marginTop: '20px' }} />
				<DockIcon title={'copy'} faIcon={faSave} style={{ marginTop: '20px' }} />
				<DockIcon title={'copy'} faIcon={faSave} style={{ marginTop: '20px' }} />
			</Dock>

			<ControlBar searchBar={true}>
				<CoreButton style={{ marginRight: '50px' }}><FontAwesomeIcon icon={faCopy} /> Copy</CoreButton>
				<CoreButton style={{ marginRight: '50px' }}><FontAwesomeIcon icon={faCogs} /> Edit</CoreButton>
				<CoreButton style={buttonStyle} onClick={()=>{
					data.refresh()
					data2.refresh()
				}}> <FontAwesomeIcon icon={faSync} /> Refresh</CoreButton>
				<CoreButton style={buttonStyle}><FontAwesomeIcon icon={faTimesCircle} /> Delete</CoreButton>
				<CoreButton style={buttonStyle}><FontAwesomeIcon icon={faPrint} /> Print</CoreButton>
			</ControlBar>

			<SplitScreen>
				<div>
					<InfoTabContainer defaultTab='tab1'>
						<InfoTab tabTitle='BL Commitments' tabID='tab1'>
							<MainTable
								pageSize={50}
								headers={headers}
								data={data}
								settingsID={'WIP_Table_1'}
								searchable
							/>
						</InfoTab>

						<InfoTab tabTitle='Unplanned Work' tabID='tab2'>
							<MainTable
								pageSize={50}
								headers={headers2}
								data={data2}
								settingsID={'WIP_Table_2'}
								searchable
								nestedComponent={Nest}
								nestedProps={{ content: 'Hello' }}
							/>
						</InfoTab>
					</InfoTabContainer>

				</div>

				<div>
					<div>
						<InfoTabContainer defaultTab='tab1'>
							<InfoTab tabTitle='CSVN' tabID='tab1'>
								<InfoCard stripe>
									CSVN Module Goes Here
								</InfoCard>
							</InfoTab>

							<InfoTab tabTitle='Escalation' tabID='tab2'>
								<InfoCard stripe>
									Escalation Goes Here
								</InfoCard>
							</InfoTab>
						</InfoTabContainer>
					</div>
				</div>
			</SplitScreen>

		</Module>
	)
}