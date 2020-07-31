import React, {useState} from 'react'
import {Route, Switch} from 'react-router'
import lockedContext from '../Contexts/LockedContext'
import moduleContext from '../Contexts/ModuleContext'
	
export default function SystemModuleContainer(props){
	
	//Adjusts the module container to fit between the system toolbars
	const styleSettings = {
		height: props.system.layout.get().heightCSS,
		width: props.system.layout.get().widthCSS,
		right: '0'
	}

	const moduleList = props.system.getModules();
	const moduleDataState = useState({})

	//Render the chosen module
	return(
		<lockedContext.Provider value = {props.locked}>
			<moduleContext.Provider value={moduleDataState}>
				
				<div className={"moduleContainer"} style={styleSettings}>
					<Switch>
						{/*<ActiveModule.component /> */}

						{Object.keys(moduleList).map(m => {
							return <Route path={'/' + m} key={'routeFor' + m} component={moduleList[m].component} />
						})}
						<Route path='/' component={moduleList[props.system.getHomeModule()].component} />
					</Switch>
				</div>
				
			</moduleContext.Provider>
		</lockedContext.Provider>
	)
	
}