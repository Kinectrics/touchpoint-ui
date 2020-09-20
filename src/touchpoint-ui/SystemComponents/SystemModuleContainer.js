import React, {useState} from 'react'
import {Route, Switch} from 'react-router'
import moduleContext from '../Contexts/ModuleContext'
	
export default function SystemModuleContainer(props){
	
	//Adjusts the module container to fit between the system toolbars
	const styleSettings = {
		height: props.system.Layout.get().heightCSS,
		width: props.system.Layout.get().widthCSS,
		right: '0'
	}

	const moduleList = props.system.Modules.list();
	const moduleDataState = useState({})

	//Render the chosen module
	return(
			<moduleContext.Provider value={moduleDataState}>
				
				<div className={"moduleContainer"} style={styleSettings}>
					<Switch>
						{/*<ActiveModule.component /> */}

						{Object.keys(moduleList).map(m => {
							return <Route path={'/' + m} key={'routeFor' + m} component={moduleList[m].component} />
						})}
						<Route path='/' component={moduleList[props.system.Modules.getHomeName()].component} />
					</Switch>
				</div>
				
			</moduleContext.Provider>
	)
	
}