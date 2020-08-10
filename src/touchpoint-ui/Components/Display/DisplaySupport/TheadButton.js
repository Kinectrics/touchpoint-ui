import React, {useState} from 'react'
import MenuButton from '../MenuButton'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCaretDown, faFilter} from '@fortawesome/free-solid-svg-icons'
import TheadMenu from './TheadMenu'


export default function TheadButton(props){
	
	//if there is a menu, add a dropdown icon
	let icon = <FontAwesomeIcon icon={faCaretDown} />
	let iconClass = ''
	if (props.header.hasFilter()) { 
		icon = <FontAwesomeIcon icon={faFilter} />
		iconClass = 'smallerIcon'
	}
	
	const [openTrigger, setOpenTrigger] = useState(false)
	
	if(props.noSort && props.noFilter) { 
		
		return(props.children)
		
	} else{
		return (
			<MenuButton 
				className='TheadButton' 
				locked = {false} 
				onOpen = {()=>setOpenTrigger(!openTrigger)}
				menuContent={<TheadMenu
					dataHeaders={props.dataHeaders}
					header={props.header}
					data={props.data}
					noSort = {props.noSort}
					noFilter = {props.noFilter}
					openTrigger = {openTrigger}
				/>}
				menuStyle = {{maxWidth: '350px', maxHeight: '310px'}}
			>
				{props.children}
				<span className = {iconClass}>{icon}</span>			
			</MenuButton>
		)
	}
}