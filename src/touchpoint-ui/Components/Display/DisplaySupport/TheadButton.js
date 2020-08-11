import React, {useState} from 'react'
import MenuButton from '../MenuButton'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCaretDown, faFilter, faSortAlphaDown, faSortAlphaDownAlt} from '@fortawesome/free-solid-svg-icons'
import TheadMenu from './TheadMenu'
import './TheadMenu'


export default function TheadButton(props){
	
	//if there is a menu, add a dropdown icon
	let arrowIcon = <span><FontAwesomeIcon icon={faCaretDown} /></span>	
	let filterIcon = null
	let sortIcon = null
	
	const hasFilter = props.header.hasFilter()
	const sortRule = props.header.sortRule
		
	if(sortRule){
		arrowIcon = null
		sortIcon = sortRule === 'asc' ?
		<span><FontAwesomeIcon icon={faSortAlphaDown} /></span> :
		<span><FontAwesomeIcon icon={faSortAlphaDownAlt} /></span>
	}
	
	
	if (hasFilter) {
		arrowIcon = null
		filterIcon = <span className='smallIcon' style={{
			paddingLeft: '5px',
		}}><FontAwesomeIcon icon={faFilter} /></span>
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
					noSort = {props.noSort}
					noFilter = {props.noFilter}
				/>}
				
				menuStyle = {{
					maxWidth: props.noFilter ? '180px' : '350px', 
					maxHeight: '310px'
				}}
			>
				{props.children}
				{arrowIcon}
				{sortIcon}		
				{filterIcon}				
			</MenuButton>
		)
	}
}

