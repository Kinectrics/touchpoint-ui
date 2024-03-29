import React, {useContext, useState} from 'react'
import ReactDOM from 'react-dom'
import lockedContext from '../../Contexts/LockedContext'
import menuContext from '../../Contexts/MenuContext'
import PropTypes from 'prop-types'
import './MenuButton.css'
import {Dropdown} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCaretRight} from '@fortawesome/free-solid-svg-icons'

const dropMenu = React.forwardRef(
	(props, ref) => {
		const menuMaxWidth = props.menuStyle && props.menuStyle.width ? null : '180px'
		
		return (
			<menuContext.Provider value={{submenu: true}}>
				<div
					ref={ref}
					className={props.className + ' Menu ' + props.menuClass}
					style={{maxWidth: menuMaxWidth, ...props.style, ...props.menuStyle}}
					onClick={props.onClickBody}
				>
					{typeof (props.MenuContent) == 'function' ? <props.MenuContent {...props.menuProps}/> : props.MenuContent}
				</div>
			</menuContext.Provider>
		)
	}
)

export default function MenuButton(props){
	
	//deccides if the component is locked based on props and parents in the tree
	const lockedFromAbove = useContext(lockedContext)
	const locked = props.locked || (lockedFromAbove && props.locked === undefined)
	
	let lockedClass
	if(locked){lockedClass = 'locked'}
	
	const [toggling, setToggling] = useState(false)
	
	//handles both onOpen and onClose
	function toggleHandler(isOpen){
		
		if(!toggling && isOpen && props.onOpen){
			props.onOpen()
			
		} else if(!toggling && props.onClose && !isOpen){
			props.onClose()
			setToggling(true)
		}
		
		//Prevent spamming
		setTimeout(()=>setToggling(false), 300)
	}
	
	//check if it's inside of another menu, if so render as a submenu
	const parentMenuData = useContext(menuContext)
	const icon = parentMenuData.submenu ? <span className='subMenuIcon'>
			<FontAwesomeIcon icon={faCaretRight} />
	</span> : null

	
	let direction = props.direction
	if(parentMenuData.submenu){
		direction = 'right'
	}

	const notifications = props.notifications < 99 ? props.notifications : '99+'
	const notificationBadge = props.notifications && !locked ?
		<span className='notifications' style={props.notificationStyle}>{notifications}</span>
		: null
	
	//button
	const dropButton = React.forwardRef(({onClick}, ref)=> { 
		
		function clickHandler(e){
			e.preventDefault() 
			onClick(e)
		}
		
		return( 
			<button 
				className={'MenuButton '+ props.className + ' ' + lockedClass}
				onClick={clickHandler}
				ref={ref}
				style={props.style}
				title={props.title}
				data-display='static'
			>
				{notificationBadge}
				{props.children}
				{icon}
				
			</button>
		)
	})
	
	//Prevent submenus from sticking around after their parent has closed
	function onClickBody(){
		if(parentMenuData.submenu){
			document.body.click()
		}
	}
	
	if(props.hidden){return null}
	
	//If locked return a button that does nothing, otherwise create a real dropdown button
	if(locked){
		
		return (<button
				title={props.title}
				className={'MenuButton ' + props.className + ' ' + lockedClass}
				style={props.style}
				data-display='static'
			>
				
			{props.children}
			{icon}

		</button>)
		
	}
	
	return(
		
		<span className = 'menuButtonContainer'>
			<Dropdown drop={direction} onToggle = {toggleHandler}>
				
				<Dropdown.Toggle as={dropButton}/>
				
				{ReactDOM.createPortal(<Dropdown.Menu 
					as={dropMenu}
					MenuContent = {props.menuContent}
					menuProps = {props.menuProps}
					menuStyle = {props.menuStyle}
					onClickBody = {onClickBody}
				/>, document.body)}
				
			</Dropdown>
		</span>
		
	)
}

//Proptypes
MenuButton.propTypes = {
	locked: PropTypes.bool,
	className: PropTypes.string,
	menuContent: PropTypes.any.isRequired,
	maxHeight: PropTypes.string,
	direction: PropTypes.string,
	onOpen: PropTypes.func,
	onClose: PropTypes.func,
	menuStyle: PropTypes.object,
	style: PropTypes.object,
	notificationStyle: PropTypes.object,
	menuProps: PropTypes.object,
	title: PropTypes.string,
}
