import './TouchPointApp.css'
import React, {useState, useEffect} from 'react'
import SystemPopupHandler from '../../SystemComponents/SystemPopupHandler'
import SystemModuleContainer from '../../SystemComponents/SystemModuleContainer'
import systemContext from '../../Contexts/SystemContext'
import SystemThemeEngine from '../../SystemComponents/ThemeEngine'
import PropTypes from 'prop-types'
import {HashRouter} from 'react-router-dom'
import SystemDrawerHandler from '../../SystemComponents/SystemDrawerHandler'

export default function TouchPointApp(props){
	
	//System-wide state
	const [activePopup, setPopup] = useState(null);
	
	//Set moduleTransition to 'transition' while the modules are being switched out
	const [screenBlock, setScreenBlock] = useState(false) //if true, no clicks will register
	const [popupEffect, setPopupEffect] = useState('')
	const [moduleLock, setModuleLock] = useState(props.locked)
	
	const [drawerIsOpen, setDrawerIsOpen] = useState(false)
	const [drawerData, setDrawerData] = useState()
	const [screenEffect, setScreenEffect] = useState('')
	
	const [layout, setLayout] = useState({
		heightCSS: '100%',
		widthCSS: '100%',

		widths: {},
		heights: {},
	})
	
	
	//Functions that are available to all modules and can be used system-wode 
	//Used for things like switching modules, sending out emails, etc. for consistency across the system
	const System = {
		
		//Create a copy of props.modules, excluding any hidden modules. 
		getModules: () => {
			const modules = {}
			Object.keys(props.modules).forEach((m)=>{
				if(!props.modules[m].hidden){
					modules[m] = props.modules[m]
				}
			})
			
			return modules
		},
		
		getHomeModule: () => {return props.homeModule},
		
		//Setting system wide variables
		setTheme: (themeName) => {
			const themeEngine = new SystemThemeEngine
			themeEngine.setTheme(themeName)
		},
		
		//Interacting with the parent app
		openModule: (moduleName) => {
			
			if(props.modules[moduleName]){
				//setActiveModule(moduleName)
				window.location.href = '#/' + moduleName
				setModuleLock(props.modules[moduleName].locked)
				
				if(props.onOpenModule){ props.onOpenModule(moduleName) }
			}
		},
		
		disableInput: (forTime) => {
			setScreenBlock(true)
			
			if(forTime){
				setTimeout(() => setScreenBlock(false), forTime)
			}
		},
		
		enableInput: () => {setScreenBlock(false)},
		
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
				setTimeout(() => setPopup(null), 250)
				setScreenEffect('')
			},
		},
		
		Drawer:{
			open: ()=>{ if(!drawerIsOpen){
				setScreenEffect('blurScreenEffect')
				setDrawerIsOpen(true)
			}},
			
			close: () => { if(drawerIsOpen){
				setDrawerIsOpen(false)
				setScreenEffect('')
			}},
			
			data: drawerData,
			setData: setDrawerData,
			
			isOpen: drawerIsOpen
		},
		
		//Internal variables for structuring the app
		layout: {get: ()=>layout, set: setLayout},
		
		io: props.io
	}
	
	//Initial setup. Initaializes the theme handler object, and sets the theme to the preffered user theme
	useEffect(() => {
		const themeEngine = new SystemThemeEngine()
		themeEngine.getUserTheme()
	}, [])
	
	//Input blocker for clicks
	let screenBlocker = null
	if(screenBlock){
		screenBlocker = <div className="screenBlocker" />
		
	} else screenBlocker = null
	
	//The App JSX itself
	return (
		<div className={"TouchPointApp "}>
			<systemContext.Provider value ={System}>
					<HashRouter>
					{screenBlocker}
					
					<SystemDrawerHandler
						className={ activePopup ? screenEffect : ''}
						{...System.Drawer.data}
						drawer={System.Drawer}
					/>
					
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
}
