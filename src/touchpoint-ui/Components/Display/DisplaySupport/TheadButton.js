import React, {useState} from 'react'
import MenuButton from '../MenuButton'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCaretDown, faFilter, faSortAlphaDown, faSortAlphaDownAlt} from '@fortawesome/free-solid-svg-icons'
import TheadMenu from './TheadMenu'
import './TheadMenu'

export default function TheadButton(props){
	
	//if there is a menu, add a dropdown icon
	let arrowIcon = <span className='theadIcon'><FontAwesomeIcon icon={faCaretDown}/></span>	
	let filterIcon
	let sortIcon
	
	const hasFilter = props.header.hasFilter()
	
	const sortRule = props.dataHeaders.getSortRules().find(sr => sr.headerID === props.header.headerID)
		
	if(sortRule){
		arrowIcon = null
		sortIcon = sortRule.direction === 'asc' ?
		<span><FontAwesomeIcon icon={faSortAlphaDown} /></span> :
		<span><FontAwesomeIcon icon={faSortAlphaDownAlt} /></span>
	}
	
	
	if (hasFilter) {
		arrowIcon = null
		filterIcon = <span className='smallIcon' style={{
			paddingLeft: '5px',
		}}><FontAwesomeIcon icon={faFilter} /></span>
	}
	
	//changes every time the menu opens. Used by useEffect listeners in the menu to respond to the open event
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
					props.data.generateMetadata({noSort: true, noSearch: true})
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
					maxWidth: props.noFilter ? '180px' : '400px', 
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