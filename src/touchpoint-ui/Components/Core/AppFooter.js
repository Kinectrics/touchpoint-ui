import React from 'react'
import './AppFooter.css'
import useSystem from '../../Hooks/UseSystem'
import usePresence from '../../Hooks/UsePresence'

export default function AppFooter(props) {
	
	//Declare itself to the app so the modules can be fit around it
	usePresence('TouchPointAppFooter','var(--appToolbarHeight)')
	
	return (
		<div className="AppFooter" style = {props.style}>
			{props.children}
		</div>
	)
}
