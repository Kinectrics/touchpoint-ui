import React from 'react'
import {useSystem, AppToolbar, MenuButton} from './touchpoint-ui'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome } from "@fortawesome/free-solid-svg-icons"

export default function CustomToolbar() {
	

	const devMode = process.env.NODE_ENV === 'development' ? ' (Dev Mode)' : ''
	
	const System =  useSystem()
	const moduleList = System.getModules()
	
	return (
		<AppToolbar label = {'Bruce Power DMS' + devMode}>
			<button
				style={{
					marginTop: '2px',
					paddingLeft: '4px',
					backgroundColor: 'var(--navColor) !important',
					border: 'none',
					color: 'var(--navTextColor)',
				}}
				onClick={(e) => {
					System.openModule(System.getHomeModule())
					e.target.blur()
				}}
			>
				<FontAwesomeIcon icon={faHome} /> Home
			</button>

			<MenuButton title="Application"
				menuContent={
					Object.keys(moduleList).map((m) => {
						if (m !== System.getHomeModule()) {
							return (
								<button
									onClick={() => System.openModule(m)}
									key={'SystemToolBarOpenModule' + m}
								>{moduleList[m].name}</button>
							)
						} else return null
					})
				}
			>Application</MenuButton>

			<MenuButton menuContent={
				<button>Class V Estimation</button>
			}>Tools</MenuButton>

			<MenuButton menuContent={
				<div>
					<button>User Delegation</button>
					
					<MenuButton menuContent={
						<div>
							<button onClick={() => System.Theme.set('blue')}>Blue Theme</button>
							<button onClick={() => System.Theme.set('orange')}>Orange Theme</button>
							<button onClick={() => System.Theme.set('dark')}>Dark Theme</button>
						</div>
					}>Theme</MenuButton>
					
				</div>
			}>
				Settings
			</MenuButton>

			<MenuButton menuContent={
				<div>
					<button>Request Change</button>
					<button>Report Bug</button>
					<button>Contact Dev Team</button>
				</div>
			}>Support</MenuButton>

			<MenuButton menuContent={
				<div>
					<button>View Help Files</button>
					<button>About DMS</button>
				</div>
			}>Help</MenuButton>
			
		</AppToolbar>
	)
}
