import './TouchPointApp.css'
import React, {useState, useEffect} from 'react'
import SystemPopupHandler from '../../SystemComponents/SystemPopupHandler'
import SystemModuleContainer from '../../SystemComponents/SystemModuleContainer'
import systemContext from '../../Contexts/SystemContext'
import SystemThemeEngine from '../../SystemComponents/ThemeEngine'
import PropTypes from 'prop-types'

export default function TouchPointApp(props) {
	
	//System-wide state
	const [activePopup, setPopup] = useState(null);
	const [activeModule, setActiveModule] = useState(props.defaultModule)
	
	//Set moduleTransition to 'transition' while the modules are being switched out
	const [screenEffect, setScreenEffect] = useState('')
	const [screenBlock, setScreenBlock] = useState(false) //if true, no clicks will register
	const [popupEffect, setPopupEffect] = useState('')
	
	//Layout state - allows modules to fit available space between system toolbars
	const [hasAppToolbar, setHasAppToolbar] = useState(false)
	const [hasAppFooter, setHasAppFooter] = useState(false)
	
	//Functions that are available to all modules and can be used system-wode 
	//Used for things like switching modules, sending out emails, etc. for consistency across the system
	const System = {
	
		//Accessing system wide information
		getActiveModule: () => {return(activeModule)},
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
				setActiveModule(moduleName)
			}
		},
		
		disableInput: (forTime) => {
			setScreenBlock(true)
			
			if(forTime){
				setTimeout(() => setScreenBlock(false), forTime)
			}
		},
		
		enableInput: () => {setScreenBlock(false)},
		
		openPopup: (PopupComponent) => {
			setScreenBlock(true)
			setTimeout(() => setScreenBlock(false), 400)
			
			setScreenEffect('blurScreenEffect')
			setPopupEffect('transparent')
			setPopup(PopupComponent)
			setTimeout(() => setPopupEffect(''), 0)
		},
		
		closePopup: () => {
			if(activePopup.props.onClose){activePopup.props.onClose()}
			setPopupEffect('transparent')
			setTimeout(()=>setPopup(null), 250)
			setScreenEffect('')
		},
		
		//Internal variables for structuring the app
		layout: {
			hasAppToolbar: hasAppToolbar,
			setHasAppToolbar: setHasAppToolbar,
			
			hasAppFooter: hasAppFooter,
			setHasAppFooter: setHasAppFooter,
		},
		
		io: props.io
	}
	
	//Initial setup. Initaializes the theme handler object, and sets the theme to the preffered user theme
	useEffect(() => {
		const themeEngine = new SystemThemeEngine()
		themeEngine.getUserTheme(System.io.getActiveUser())
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
				
				{screenBlocker}
				
				<div className={'screenEffect ' + screenEffect}>
					
					{props.children}
					
					<SystemModuleContainer system = {System} locked = {props.locked}/>
					
				</div>
				
				<SystemPopupHandler 
					system = {System} 
					activePopup = {activePopup}
					popupEffect = {popupEffect}
				/>
				
			</systemContext.Provider>
		</div>
	);
}

//Proptypes
TouchPointApp.propTypes = {
	locked: PropTypes.bool,
	modules: PropTypes.object.isRequired,
	activeUser: PropTypes.string.isRequired,
	homeModule: PropTypes.string,
	io: PropTypes.any
}
