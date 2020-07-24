import React, {useState} from 'react'
import {Route, Switch} from 'react-router'
import lockedContext from '../Contexts/LockedContext'
import moduleContext from '../Contexts/ModuleContext'
	
export default function SystemModuleContainer(props){
	
	let n = 0
	if(props.system.layout.hasAppToolbar){n++}
	if(props.system.layout.hasAppFooter){n++}
	
	//Adjusts the module container to fit between the system toolbars
	const styleSettings = {
		height: 'calc(100vh - ' + n + ' * var(--appToolbarHeight))',
		width: '100vw'
	}

	const moduleList = props.system.getModules();
	
	const [searchText, setSearchText] = useState('')

	const moduleDataState = useState()

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