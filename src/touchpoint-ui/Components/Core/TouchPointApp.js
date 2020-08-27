import './TouchPointApp.css'
import '../Inputs/InputStyles.css'
import React, {useState, useEffect, useRef} from 'react'
import SystemPopupHandler from '../../SystemComponents/SystemPopupHandler'
import SystemModuleContainer from '../../SystemComponents/SystemModuleContainer'
import systemContext from '../../Contexts/SystemContext'
import lockedContext from '../../Contexts/LockedContext'
import SystemThemeEngine from '../../SystemComponents/ThemeEngine'
import PropTypes from 'prop-types'
import {HashRouter} from 'react-router-dom'

export default function TouchPointApp(props){
	
	//System-wide state
	const [activePopup, setPopup] = useState(null);
	
	const portalDestination = useRef()
	
	//Set moduleTransition to 'transition' while the modules are being switched out
	const [screenBlock, setScreenBlock] = useState(false) //if true, no clicks will register
	const [popupEffect, setPopupEffect] = useState('')
	const [moduleLock, setModuleLock] = useState(props.locked)
	
	const [drawerIsOpen, setDrawerIsOpen] = useState(false)
	const [screenEffect, setScreenEffect] = useState('')
	
	const [layout, setLayout] = useState({
		heightCSS: '100%',
		widthCSS: '100%',
		
		widths: {},
		heights: {},
	})
	
	function saveSettings(settingsID, settingsToken){
		if (props.saveSettings && settingsID) {
			props.saveSettings(settingsID, settingsToken)
		}
	}
	
	//Functions that are available to all modules and can be used system-wode 
	//Used for things like switching modules, sending out emails, etc. for consistency across the system
	const System = {
		
		//Setting system wide variables
		Theme: {
			set:(themeName) => {
				const themeEngine = new SystemThemeEngine()
				themeEngine.setTheme(themeName)
				saveSettings('TouchPointAppTheme', themeName)
			}
		},
		
		Modules: {
			open: (moduleName) => {

				if (props.modules[moduleName]) {
					//setActiveModule(moduleName)
					window.location.href = '#/' + moduleName
					setModuleLock(props.modules[moduleName].locked)

					if (props.onOpenModule) { props.onOpenModule(moduleName) }
				}
			},
			
			list: () => {
				const modules = {}
				Object.keys(props.modules).forEach((m) => {
					if (!props.modules[m].hidden) {
						modules[m] = props.modules[m]
					}
				})

				return modules
			},
			
			getHomeName: () => { return props.homeModule },
		},
		
		Input: {
			enable:() => {setScreenBlock(false)},
			
			disable: (forTime) => {
				setScreenBlock(true)

				if (forTime) {
					setTimeout(() => setScreenBlock(false), forTime)
				}
			},
		},
		
		Popup: {
			open: (PopupComponent) => {
				setScreenBlock(true)
				setTimeout(() => setScreenBlock(false), 400)

				setScreenEffect('blurScreenEffect')
				setPopupEffect('transparent')
				setPopup(PopupComponent)
				setTimeout(() => setPopupEffect(''), 0)
			},

			close: () => {
				// if(activePopup.props.onClose){activePopup.props.onClose()}
				setPopupEffect('transparent')
				setTimeout(() => setPopup(null), 100)
				if(!drawerIsOpen){setScreenEffect('')}
			},
		},
		
		Drawer:{
			open: ()=>{ if(!drawerIsOpen){
				setScreenEffect('blurScreenEffect')
				setDrawerIsOpen(true)
			}},
			
			close: () => { if(drawerIsOpen){
				setDrawerIsOpen(false)
				if(!activePopup){setScreenEffect('')}
			}},
			
			isOpen: drawerIsOpen,
			
			portalDestination: portalDestination,
			className: activePopup ? screenEffect : '',
		},
		
		//Internal variables for structuring the app
		layout: {get: ()=>layout, set: setLayout},
		
		Settings: {
			save: saveSettings,
			
			get: async (settingsID) => {
				try {
					return await props.getSettings(settingsID)
				} catch(err){
					console.error(err)
					return null
				}
			}
		},
		
		io: props.io
	}
	
	//initial setup - theme and settings
	useEffect(()=>{
		async function applySavedTheme(){
			const newTheme = await System.Settings.get('TouchPointAppTheme')
			if(newTheme){System.Theme.set(newTheme)}
		}
		
		applySavedTheme()
	})
	
	//Input blocker for clicks
	let screenBlocker = null
	if(screenBlock){
		screenBlocker = <div className="screenBlocker" />
		
	} else screenBlocker = null
	
	//The App JSX itself
	return (
		<div className={"TouchPointApp "}>
			<lockedContext.Provider value = {props.locked}>
				<systemContext.Provider value ={System}>
						<HashRouter>
						{screenBlocker}
						
						<div ref = {portalDestination}>
							{/* Portal Destination for App Drawer */}
						</div>
						
						<div className={'screenEffect ' + screenEffect}>
							
							{props.children}
							
							<SystemModuleContainer 
								system = {System} 
								locked = {props.locked || moduleLock}
							/>
							
						</div>
						
						<SystemPopupHandler 
							system = {System} 
							activePopup = {activePopup}
							popupEffect = {popupEffect}
						/>
						
					</HashRouter>
				</systemContext.Provider>
			</lockedContext.Provider>
		</div>
	)
}

//Proptypes
TouchPointApp.propTypes = {
	locked: PropTypes.bool,
	modules: PropTypes.object.isRequired,
	homeModule: PropTypes.string,
	io: PropTypes.any,
	onOpenModule: PropTypes.func,
	saveSettings: PropTypes.func,
	getSettings: PropTypes.func,
}
