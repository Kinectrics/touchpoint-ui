import React, {useState} from 'react'
import MenuButton from '../MenuButton'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCaretDown, faFilter} from '@fortawesome/free-solid-svg-icons'
import TheadMenu from './TheadMenu'
import './TheadMenu'


export default function TheadButton(props){
	
	//if there is a menu, add a dropdown icon
	let icon = <FontAwesomeIcon icon={faCaretDown} />
	let iconClass = ''
	
	if (props.header.hasFilter()) { 
		icon = <FontAwesomeIcon icon={faFilter} />
		iconClass = 'smallerIcon'
	}
	
	//changes every time the menu opens. Used by useEffect listeners in teh menu to respond to the open event
	const [openTrigger, setOpenTrigger] = useState(false) 
	
	const [isOpen, setIsOpen] = useState(false)
	
	const openClass = isOpen ? ' open ' : ''
	
	if(props.noSort && props.noFilter) { 
		
		return(props.children)
		
	} else{
		return (
			<MenuButton 
				className={'TheadButton '  + openClass} 
				locked = {false} 
				onOpen = {()=>{
					setOpenTrigger(!openTrigger)
					setIsOpen(true)
				}}
				
				onClose = {()=>{
					props.data.sort()
					setIsOpen(false)
				}}
				
				menuContent={<TheadMenu
					dataHeaders={props.dataHeaders}
					header={props.header}
					data={props.data}
					openTrigger={props.openTrigger}
				/>}
				
				menuStyle = {{maxWidth: '350px', maxHeight: '310px'}}
			>
				{props.children}
				<span className = {iconClass}>{icon}</span>			
			</MenuButton>
		)
	}
}