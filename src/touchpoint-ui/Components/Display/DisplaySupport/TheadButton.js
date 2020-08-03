import React, {useState} from 'react'
import MenuButton from '../MenuButton'
import InfoTab from '../../Containers/InfoTab'
import InfoTabContainer from '../../Containers/InfoTabContainer'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCaretDown, faFilter} from '@fortawesome/free-solid-svg-icons'
import FilterMenu from './FilterMenu'

export default function TheadButton(props){
	
	//Checks if the header has an active filter, to show a different icon
	const [defaultTab, setDefaultTab] = useState(props.noFilter ? 'sort' : 'filter')
	
	const [expanded, setExpanded] = useState(true)
	
	//filter tab - if the correct props are available to enable filtering
	const filterMenu = <InfoTab tabID='filter' tabTitle='Filter' hidden = {props.noFilter}>
		<FilterMenu
			dataHeaders = {props.dataHeaders}
			header = {props.header}
			data = {props.data}
			expanded = {expanded}
			setExpanded = {setExpanded}
		/>
	</InfoTab>
	
	
	//Sort tab - if the correct props are available to enable sorting
	const sortMenu = <InfoTab tabID='sort' tabTitle='Sort' hidden={props.noSort}>
		<button>Sort Test</button>
	</InfoTab>
	
	//Combine available tabs - if at least one is avilable
	let overallMenu = <div>
		<InfoTabContainer defaultTab = {defaultTab} onTabChange = {(tabID)=>{
			setDefaultTab(tabID)
		}}>
			{filterMenu}
			{sortMenu}
		</InfoTabContainer>
	</div>
	
	
	//if there is a menu, add a dropdown icon
	let icon = <FontAwesomeIcon icon={faCaretDown} />
	let iconClass = ''
	if (props.header.hasFilter()) { 
		icon = <FontAwesomeIcon icon={faFilter} />
		iconClass = 'smallerIcon'
	}
	
	if(props.noSort && props.noFilter) { 
		
		return(props.children)
		
	} else{
		return (
			<MenuButton 
				className='TheadButton' 
				locked = {false} menuContent={overallMenu}
				menuStyle = {{maxHeight: '50vh'}}
			>
				{props.children}
				<span className = {iconClass}>{icon}</span>			
			</MenuButton>
		)
	}
}