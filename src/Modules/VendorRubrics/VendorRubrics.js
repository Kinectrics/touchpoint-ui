import React from 'react'
import {Module, ControlBar, SplitScreen, PopupCard, InfoTab, InfoTabContainer, ControlButton, MainTable} from '../../touchpoint-ui'
import {useSystem, useDataset} from '../../touchpoint-ui'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCalendarAlt, faChartArea, faSyncAlt} from "@fortawesome/free-solid-svg-icons"
import {fakeData} from '../../SQLSimulator'
import RubricHeader from './RubricHeader'
import RubricDetail  from './RubricDetail'
import PBI from '../../Temp/PBI.jpg'
import './StatusLog'
import StatusLog from './StatusLog'
import TestExpandedRows from './TestExpandedRows'
import moment from 'moment'

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
		{headerID:'id',displayName:'ID', width: 100, required: true},
		{headerID: 'vendor', displayName:'My Vendor', width: 300, onEdit: (cell, row)=>{
			console.log(cell + ' ' + row.id)
			if(cell === '1'){throw('ERR')}
		}},
		{headerID: 'project', displayName: 'Project', width: 100, type: 'number'},
		{headerID: 'projectName', displayName:'Project Name', width: 220,},
		{headerID: 'status', displayName: 'Status', width: 200, required: true, styling: statusStyle},
		
		{headerID: 'due', displayName: 'Due', width: 150, type: 'date', onEdit: (cell)=>{
			return moment(cell).isAfter(moment())
		}},
		
		{headerID: 'SM', displayName:'SM', width: 200, },
		{headerID: 'intern', displayName:'Intern', width: 300},
	]
	
	//Data from the 'server'
	const data  = useDataset(()=>fakeData(50), 'id')
	
	return (
		<Module moduleName = "VendorRubrics" >
			<ControlBar searchBar locked={false}>
				
				<ControlButton onClick={()=>{
					console.log(data.read())
				}}>
					<FontAwesomeIcon icon={faCalendarAlt} /> Log Data
				</ControlButton>
				
				<ControlButton onClick={()=>{
					data.refresh()
				}}>
					<FontAwesomeIcon icon={faSyncAlt} /> Refresh
				</ControlButton>
				
				<ControlButton onClick={() => system.Popup.open(
					<PopupCard 
						closeButton
						width='fit-content'
						height='90%'
						title = 'Embedded Reports Coming Soon!'						
					>
						<img src={PBI} height={'90%'}/>
					</PopupCard>
				)}>
					<FontAwesomeIcon icon = {faChartArea}/> Business Intelligence
				</ControlButton>
				
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
						<RubricDetail />
					</InfoTab>	
					
					<InfoTab tabID = "StatusLog" tabTitle='Status Log'>
						<StatusLog
							dataRow={data.getActiveRecord()}
							statusStyle={statusStyle}
						/>
					</InfoTab>								
							
				</InfoTabContainer>
			</SplitScreen>
		</Module>
	)
}