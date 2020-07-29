import React, {useState} from 'react'
import {Module, ControlledTabContainer, InfoTab, FreeButton} from '../../touchpoint-ui'
import './ETDB.css'

export default function ETDB() {
	
	const [tab, setTab] = useState('Emergent')
	
	function tabClickHandler(e){
		setTab(e.target.innerHTML)
	}
	
	return (
		<Module moduleName = 'ETDB'>
			
			<div className="sideBar">
				<FreeButton wide onClick = {tabClickHandler}>Emergent</FreeButton>
				<FreeButton wide onClick = {tabClickHandler}>Scheduled</FreeButton>
			</div>
			
			<div className="main">
				
				<ControlledTabContainer activeTab = {tab}>
					
					<InfoTab tabID = 'Emergent'>Emergent</InfoTab>
					<InfoTab tabID = 'Scheduled'>Scheduled</InfoTab>
					
				</ControlledTabContainer>
				
			</div>
			
		</Module>
	)
}