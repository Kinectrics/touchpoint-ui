import React from 'react'
import { Module, ControlBar, SplitScreen, PopupCard, InfoTab, InfoTabContainer, MainTable, ControlledTabContainer } from '../../touchpoint-ui'
import { useSystem, useDataset } from '../../touchpoint-ui'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarAlt, faChartArea, faSyncAlt, faTimesCircle, faPenFancy } from "@fortawesome/free-solid-svg-icons"
import { fakeData } from '../../SQLSimulator'
import RubricHeader from './RubricHeader'
import RubricDetail from './RubricDetail'
import './StatusLog'
import StatusLog from './StatusLog'
import TestExpandedRows from './TestExpandedRows'
import TestCells from './TestCells'
import { RefreshButton } from '../../touchpoint-ui'
import SearchNest from './SearchNest'
import { useState } from 'react'

//And begin
export default function VendorRubrics() {

	//Access to system functions
	const system = useSystem()

	//Conditional formatting for the status
	const statusStyle = (cellValue) => {
		switch (cellValue) {
			case 'Complete': return { color: 'white', backgroundColor: '#009933' }
			case 'Pending Approval': return { color: 'white', backgroundColor: '#EE0000' }
			case 'In Progress': return { color: 'white', backgroundColor: '#00ccff' }
			default: return { color: 'white', backgroundColor: 'blue' }
		}
	}

	function editHandler(meta) {
		return new Promise(resolve => {
			setTimeout(() => resolve(true), 3000)
		})
	}

	const System = useSystem()

	//Headers for table
	const dataHeaders = [
		{ headerID: 'id', displayName: 'ID', width: 100, required: true, component: TestCells },
		{ headerID: 'project', displayName: 'Project', width: 100, options: [2, 100, 200], onEdit: (e) => false },
		{ headerID: 'projectName', displayName: 'Project Name', width: 220 },
		{ headerID: 'status', displayName: 'Status', width: 200, required: true, styling: statusStyle, onEdit: () => true, options: ['Complete', 'Pending Approval', 'In Progress'] },
		{
			headerID: 'due', displayName: 'Due', width: 200, type: 'date', onEdit: () => {
				return new Promise(resolve => {
					setTimeout(() => resolve(true), 5000)
				})
			}
		},
		{ headerID: 'SM', displayName: 'SM', width: 200, onEdit: editHandler },
		{ headerID: 'intern', displayName: 'Intern', width: 300, onEdit: () => true },
	]

	const dataHeaders2 = [
		{ headerID: 'id', displayName: 'ID', width: 100, required: true },
		{ headerID: 'project', displayName: 'Project', width: 100, options: [2, 100, 200], onEdit: (e) => false },
		{ headerID: 'projectName', displayName: 'Project Name', width: 220 },
		{ headerID: 'status', displayName: 'Status', width: 200, required: true, styling: statusStyle, onEdit: () => true, options: ['Complete', 'Pending Approval', 'In Progress'] },
		{
			headerID: 'due', displayName: 'Due', width: 200, type: 'date', onEdit: () => {
				return new Promise(resolve => {
					setTimeout(() => resolve(true), 5000)
				})
			}
		},
		{ headerID: 'SM', displayName: 'SM', width: 200, onEdit: editHandler },
		{ headerID: 'intern', displayName: 'Intern', width: 300, onEdit: () => true },
	]

	//Data from the 'server'
	const data = useDataset(async () => {
		const c = Math.round(Math.random() * 10)
		const sqlRes = await fakeData(c * 20)
		return sqlRes
	}, { primaryKey: 'id' })

	//Data from the 'server'
	const data2 = useDataset(async () => {
		const sqlRes = await fakeData(20)
		return sqlRes
	}, { primaryKey: 'id' })


	const [activeTab, setActiveTab] = useState('tab1')

	return (
		<Module moduleName="VendorRubrics" >

			<ControlBar searchBar searchBarProps={{
				nestedComponent: SearchNest,
				nestedProps: {
					hello: 'testing hellodahd',
				},
				alwaysShow: true
			}}>

				<button onClick={System.Drawer.open}>Drawer</button>

				<button onClick={() => {
					console.log(data)
					console.log(data.read())
				}}>
					<FontAwesomeIcon icon={faCalendarAlt} /> Log Data
				</button>

				<button onClick={() => {
					data.setRecord('8', { vendor: 'Hello', project: '700' })
				}}>
					<FontAwesomeIcon icon={faPenFancy} /> Edit Record
				</button>

				<button onClick={() => {
					setActiveTab('tab1')
				}}>
					1
				</button>

				<button onClick={() => {
					setActiveTab('tab2')
				}}>
					2
				</button>

				<RefreshButton
					data={data}
				/>

				<button onClick={() => system.Popup.open(
					<PopupCard
						closeButton
						width='fit-content'
						height='90%'
						title='Embedded Reports Coming Soon!'
					>

					</PopupCard>
				)}>
					<FontAwesomeIcon icon={faChartArea} /> Business Intelligence
				</button>

			</ControlBar>

			{/* <SplitScreen defaultSize={50}> */}
			<ControlledTabContainer activeTab={activeTab}>

				<InfoTab tabID='tab1' tabTitle='tab1'>
					<MainTable
						data={data}
						headers={dataHeaders}
						pageSize={50}
						searchable
						settingsID={'VendorRubricsMainTable'}
						nestedComponent={TestExpandedRows}
						nestedProps={{ fitToWidth: true }}
					/>
				</InfoTab>

				<InfoTab tabID='tab2' tabTitle='tab1'>
					<MainTable
						data={data2}
						headers={dataHeaders2}
						pageSize={50}
						searchable
						settingsID={'VendorRubricsMainTable22'}
					/>
				</InfoTab>

			</ControlledTabContainer>


			{/* <InfoTabContainer defaultTab='RubricHeader'>
					
					<InfoTab tabID = "RubricHeader" tabTitle='Rubric Header'>
						<RubricHeader 
							activeRecord={data.getActiveRecord()} 
							system={system}
						/>
					</InfoTab>	
					
					<InfoTab tabID = "RubricDetail" tabTitle='Rubric Detail'>
						<RubricDetail />
					</InfoTab>	
					
					<InfoTab tabID = "StatusLog" tabTitle='Status Log'>
						<StatusLog dataRow={data.getActiveRecord()} statusStyle={statusStyle}/>
					</InfoTab>								
							
				</InfoTabContainer> */}
			{/* </SplitScreen> */}
		</Module>
	)
}