import React from 'react'
import {Module, ControlBar, SplitScreen, PopupCard, InfoTab, InfoTabContainer, MainTable} from '../../touchpoint-ui'
import {useSystem, useDataset} from '../../touchpoint-ui'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCalendarAlt, faChartArea, faSyncAlt, faTimesCircle} from "@fortawesome/free-solid-svg-icons"
import {fakeData} from '../../SQLSimulator'
import RubricHeader from './RubricHeader'
import RubricDetail  from './RubricDetail'
import './StatusLog'
import StatusLog from './StatusLog'
import TestExpandedRows from './TestExpandedRows'
import TestCells from './TestCells'

//And begin
export default function VendorRubrics(){
	
	//Access to system functions
	const system = useSystem()
	
	//Conditional formatting for the status
	const statusStyle = (cellValue) => {
		switch(cellValue){
			case 'Complete': return {color: 'white', backgroundColor: '#66CD00'}
			case 'Pending Approval': return {color: 'white', backgroundColor: '#EE0000'}
			case 'In Progress': return { color: 'white', backgroundColor: '#00ccff' }
			default: return {color: 'white', backgroundColor:'blue'}
		}
	}
	
	//Headers for table
	const dataHeaders = [
		{headerID: 'id',displayName:'ID', width: 100, required: true},
		{headerID: 'vendor', displayName:'My Vendor', width: 300},
		{headerID: 'project', displayName: 'Project', width: 100, type: 'number', type:'component', component: TestCells},
		{headerID: 'projectName', displayName:'Project Name', width: 220, onEdit: ()=>{return Math.random() > 0.3}},
		{headerID: 'status', displayName: 'Status', width: 200, required: true, styling: statusStyle},
		{headerID: 'due', displayName: 'Due', width: 150, type: 'date', onClick: ({cellValue})=>console.log(cellValue)},
		{headerID: 'SM', displayName:'SM', width: 200, onEdit: ()=>{return Math.random() > 0.5}},
		{headerID: 'intern', displayName:'Intern', width: 300},
	]
	
	//Data from the 'server'
	const data  = useDataset(()=>{
		const c = Math.round(Math.random()*10)
		return fakeData((52 * c) + 1)
	}, {primaryKey: 'id'})
	
	return (
		<Module moduleName = "VendorRubrics" >
			
			<ControlBar searchBar locked={false}>
				
				<button onClick={()=>{
					console.log(data.read())
				}}>
					<FontAwesomeIcon icon={faCalendarAlt} /> Log Data
				</button>
				
				<button onClick={()=>{
					data.refresh()
				}}>
					<FontAwesomeIcon icon={faSyncAlt} /> Refresh
				</button>
				
				<button onClick={() => system.Popup.open(
					<PopupCard 
						closeButton
						width='fit-content'
						height='90%'
						title = 'Embedded Reports Coming Soon!'						
					>
						
					</PopupCard>
				)}>
					<FontAwesomeIcon icon = {faChartArea}/> Business Intelligence
				</button>
				
			</ControlBar>
			
			<SplitScreen defaultSize={50}>
				
				<MainTable
					data={data}
					headers={dataHeaders}
					pageSize={100}
					searchable={true}
					settingsID={'VendorRubricsMainTable'}
					nestedComponent = {TestExpandedRows}
					nestedProps={{ content: 'Hello World'}}
				/>
				
				
				<InfoTabContainer defaultTab='RubricHeader'>
					
					<InfoTab tabID = "RubricHeader" tabTitle='Rubric Header'>
						<RubricHeader 
							activeRecord={data.getActiveRecord()} 
							system={system}
						/>
					</InfoTab>	
					
					<InfoTab tabID = "RubricDetail" tabTitle='Rubric Detail'>
						{/* <RubricDetail /> */}
					</InfoTab>	
					
					<InfoTab tabID = "StatusLog" tabTitle='Status Log'>
						<StatusLog dataRow={data.getActiveRecord()} statusStyle={statusStyle}/>
					</InfoTab>								
							
				</InfoTabContainer>
			</SplitScreen>
		</Module>
	)
}