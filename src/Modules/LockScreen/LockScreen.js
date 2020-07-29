import React from 'react'
import './LockScreen.css'
import { Module, InfoCard, Tile} from '../../touchpoint-ui'
import {queryNotifications} from '../../SQLSimulator'
import {useSystem} from '../../touchpoint-ui'
import LoginBox from './LoginBox'


export default function LockScreen() {
	const system = useSystem()
	const notifications = queryNotifications(system.getSecurityProfile, 'VendorRubrics')
	let i = 0;
	
	const moduleList = system.getModules()
	
	return (
		
		<Module moduleName = "LockScreen">
			 
			<div className="mainArea">
				<div className="iconLayer flexCenter">

					{Object.keys(moduleList).map((m) =>{
						
						if(m != system.getHomeModule()){return(
							<Tile 
								key = {'SystemLockScreenAppIcon' + m}
								title = {moduleList[m].name}
								icon = {moduleList[m].icon}
								onClick = {() => {system.openModule(m)}}
								splashScreen
								locked = {false}
							/>
							
						)} else return null
						
					})}
					
				</div>
			</div>
			
			<div className="notificationPane">
				
				<LoginBox 
					system={system}
				/>
				
				<div className="cardList">
					<h2>Notifications</h2>
					
					{notifications.map( (ntf) => {
						i=i+1
						//Format the date nicely for each notification
						const d = new Date(ntf.due)
						const ye = new Intl.DateTimeFormat('en', { year: '2-digit' }).format(d)
						const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d)
						const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
						
						return (
							<InfoCard onClick = {() => {setTimeout(()=>system.openModule(ntf.moduleID),120)}}
								key = {'NotificationCard'+i}
								dynamicX = {true}
								stripe = {true}
								onClose = {()=>{return true}}
							>
								<label>{ntf.moduleName}</label>
								<p><b>{ntf.title} - {ntf.action}</b></p>
								<p>Due {`${da}-${mo}-${ye}`}</p>	
							</InfoCard>
						)
					})}
				</div>
			</div>
			
			
		</Module>
	)
}
