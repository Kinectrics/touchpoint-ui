import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import CoreButton from '../Inputs/CoreButton'
import MenuButton from '../Display/MenuButton'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import './DockIcon.css'
import lockedContext from '../../Contexts/LockedContext'

export default function DockIcon(props) {
	
	//deccides if the component is locked based on props and parents in the tree
	const lockedFromAbove = useContext(lockedContext)
	const locked = props.locked || (lockedFromAbove && props.locked === undefined)
	
	const icon = props.faIcon ? <FontAwesomeIcon icon = {props.faIcon} /> : null
	
	const iconStyle = {
		fontSize: props.title ? '17pt' : '20pt'
	}
	
	const notifications = props.notifications < 99 ? props.notifications : '99+'
	
	const notificationBadge = props.notifications && !locked ? 
	<span className='notifications'>{notifications}</span> 
	: null
	
	if(props.hidden){return null}
	
	if(props.menuContent){
		function openHandler(){
			if(props.onClick){props.onClick()}
			if(props.onOpen){props.onOpen()}
		}
		
		return(
			<MenuButton
				className='DockIcon'
				style={props.style}
				locked={props.locked}
				onOpen={openHandler}
				onClose={props.onClose}
				menuContent={props.menuContent}
				direction='left'
				menuStyle={props.menuStyle}
				menuProps = {props.menuProps}
			>
				{notificationBadge}
				<div className='pic' style={iconStyle}>{icon}{props.children}</div>
				<div className='title'>{props.title}</div>
			</MenuButton>
		)
	}
	
	return (
		<CoreButton 
			className = {props.active ? 'DockIcon active' : 'DockIcon'} 
			style = {props.style} 
			locked = {props.locked}
			onClick = {props.onClick}
		>
			{notificationBadge}
			<div className='pic' style = {iconStyle}>{icon}{props.children}</div>
			<div className='title'>{props.title}</div>
		</CoreButton>
	)
}

//proptypes
DockIcon.propTypes = {
	locked: PropTypes.bool,
	hidden: PropTypes.bool,
	title: PropTypes.string,
	style: PropTypes.object,
	notifications: PropTypes.number,
	onClick: PropTypes.func,
	menuContent: PropTypes.any,
	menuStyle: PropTypes.object,
	menuProps: PropTypes.object,
	active: PropTypes.bool,
}

