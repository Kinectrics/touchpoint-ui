import React from 'react';
import lockedContext from '../Contexts/LockedContext'
	
export default function SystemModuleContainer(props) {
	
	let n = 0
	if(props.system.layout.hasSystemToolbar){n++}
	if(props.system.layout.hasSystemFooter){n++}
	
	//Adjusts the module container to fit between the system toolbars
	const styleSettings = {
		height: 'calc(100vh - ' + n + ' * var(--systemToolbarHeight))',
		width: '100vw'
	}
	
	//Get the active module
	let ActiveModule = props.system.getModules()[props.system.getActiveModule()]
	
	//If there's no active module render the home module
	if(!ActiveModule){
		ActiveModule = props.system.getModules()[props.system.getHomeModule()]
		
	} else if(!ActiveModule){ //If there's no home module render the first module in the list
		ActiveModule = Object.keys(props.system.getModules())[0]
	}
		
	//Render the chosen module
	return(
		<lockedContext.Provider value = {ActiveModule.locked || props.locked}>
			<div className = {"moduleContainer"} style = {styleSettings}>
				<ActiveModule.component />
			</div>
		</lockedContext.Provider>
	)
	
}