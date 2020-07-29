import React from 'react'
import './AppFooter.css'
import useSystem from '../../Hooks/UseSystem'
import usePresence from '../../Hooks/UsePresence'

export default function AppFooter(props) {
	
	const System = useSystem() 
	const v = System.io.getVersion()
	
	//Declare itself to the app so the modules can be fit around it
	usePresence('AppFooter','var(--appToolbarHeight)')
	
	return (
		<div className="AppFooter">
			<span className="leftSide">
				{System.io.getActiveUser()} | 
				Security Profile: {System.io.getSecurityProfile()} | 
				Version: {v.number + ' - ' + v.environment}
			</span>
			
			<span className="rightSide">
				
			</span>
		</div>
	)
}
