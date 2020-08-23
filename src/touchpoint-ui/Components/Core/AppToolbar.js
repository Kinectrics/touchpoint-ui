import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './AppToolbar.css'
import usePresence from '../../Hooks/UsePresence'
import propTypes from 'prop-types'

export default function AppToolbar(props){
	
	//Declare itself to the app so the modules can be fit around it 
	usePresence('TouchPointAppToolbar', 'var(--appToolbarHeight)')
	
	return (
		<div className="AppToolbar flexY" style = {props.style}>
			<div className="buttonContainer flexY">
				{props.children}
			</div>
			
			<div className="brandingContainer">
				{props.label}
			</div>
		</div>
		
	)
}

//
AppToolbar.propTypes={
	label: propTypes.any
}
