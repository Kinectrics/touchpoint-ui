import React, {useState} from 'react'
import MenuButton from '../MenuButton'
import InfoTab from '../../Containers/InfoTab'
import InfoTabContainer from '../../Containers/InfoTabContainer'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCaretDown, faFilter, faPlus} from '@fortawesome/free-solid-svg-icons'
import FilterMenu from './FilterMenu'

export default function TheadButton(props){
	
	//Checks if the header has an active filter, to show a different icon
	const [defaultTab, setDefaultTab] = useState(props.noFilter ? 'sort' : 'filter')
	
	//filter tab - if the correct props are available to enable filtering
	let filterMenu = null
	filterMenu = <InfoTab tabID='filter' tabTitle='Filter' hidden = {props.noFilter}>
		<FilterMenu
			dataHeaders = {props.dataHeaders}
			header = {props.header}
			data = {props.data}
		>
			<button>
				<FontAwesomeIcon icon={faPlus} />
				<span style={{
					paddingLeft:'10px',
				}}>More Filters</span> 
			</button>
			
		</FilterMenu>
	</InfoTab>
	
	
	//Sort tab - if the correct props are available to enable sorting
	let sortMenu = <InfoTab tabID='sort' tabTitle='Sort' hidden={props.noSort}>
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