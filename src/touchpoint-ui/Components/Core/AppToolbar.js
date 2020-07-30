import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './AppToolbar.css'
import useSystem from '../../Hooks/UseSystem'
import usePresence from '../../Hooks/UsePresence'
import {Dropdown, DropdownButton} from 'react-bootstrap'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faHome} from "@fortawesome/free-solid-svg-icons"

export default function AppToolbar(props){
	
	const System = useSystem()
	let devMode = ''
	if(process.env.NODE_ENV === 'development'){ devMode = '(Dev Mode)'}
	
	//Declare itself to the app so the modules can be fit around it 
	usePresence('AppToolbar', 'var(--appToolbarHeight)')
	
	const moduleList = System.getModules()
	
	return (
		<div className="AppToolbar flexY" style = {props.style}>
			<div className="buttonContainer flexY">
				<button 
					className="homeButton" 
					onClick = {(e)=>{
						System.openModule(System.getHomeModule())
						e.target.blur()
					}}
				>
					<FontAwesomeIcon icon={faHome} /> Home
				</button>
				
				<DropdownButton title="Application">
					
					{Object.keys(moduleList).map((m) => {
						if (m !== System.getHomeModule()) {
							return (
								<Dropdown.Item
									onClick={() => System.openModule(m)}
									key={'SystemToolBarOpenModule' + m}
								>{moduleList[m].name}</Dropdown.Item>
							)
						} else return null
					})}
					
				</DropdownButton>
			
				<DropdownButton title="Tools">
					<Dropdown.Item>Class V Estimation</Dropdown.Item>
				</DropdownButton>
				
				<DropdownButton title="Settings">
					<Dropdown.Item>User Delegation</Dropdown.Item>
					<Dropdown.Item onClick={()=>System.setTheme('blue')}>Blue Theme</Dropdown.Item>
					<Dropdown.Item onClick={()=>System.setTheme('orange')}>Orange Theme</Dropdown.Item>
					<Dropdown.Item onClick={()=>System.setTheme('dark')}>Dark Theme</Dropdown.Item>

				</DropdownButton>
				
				<DropdownButton title="Support">
					<Dropdown.Item>Request Change</Dropdown.Item>
					<Dropdown.Item>Report Bug</Dropdown.Item>
					<Dropdown.Item>Contact Dev Team</Dropdown.Item>
				</DropdownButton>
				
				<DropdownButton title="Help">
					<Dropdown.Item>View Help Files</Dropdown.Item>
					<Dropdown.Item>About DMS</Dropdown.Item>
				</DropdownButton>	
			</div>
			
			<div className="brandingContainer">
				Bruce Power DMS {devMode}
			</div>
		</div>
		
	)
}
