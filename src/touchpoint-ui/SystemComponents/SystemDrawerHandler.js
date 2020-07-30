import React from 'react'
import lockedContext from '../Contexts/LockedContext'
import './SystemDrawerHandler.css'
import CloseButton from '../Components/Inputs/CloseButton'

export default function AppDrawer(props) {
	
	if(props.exists){return(
		
		<div className={'AppDrawer'} style={props.style}>
			<lockedContext.Provider value={props.locked}>
				
				<CloseButton locked={false} />
				{props.children}
				
			</lockedContext.Provider>
		</div>
		
	)} else return null
}