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
		return (
			<menuContext.Provider value={{ submenu: true }}>
				<div
					ref={ref}
					className={props.className + ' MenuContainer'}
					style={props.style}
				>
					<div
						style={{...props.menuStyle}}
						className={'Menu'}
					>
						{typeof (props.MenuContent) == 'function' ? <props.MenuContent /> : props.MenuContent}
					</div>
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
	let icon = null
	if(parentMenuData.submenu){
		icon = <span className='subMenuIcon'>
				<FontAwesomeIcon icon={faCaretRight} />
			</span>
	}
	
	let direction = props.direction
	if(parentMenuData.submenu){
		direction = 'right'
	}

	
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
			>
				{props.children}
				{icon}
				
			</button>
		)
	})

	//If locked return a button that does nothing, otherwise create a real dropdown button
	if(locked){
		
		return (<button
				className={'MenuButton ' + props.className + ' ' + lockedClass}
				style={props.style}
			>
				
			{props.children}
			{icon}

		</button>)
		
	} else return(
		
		<span className = 'menuButtonContainer'>
			<Dropdown drop={direction} onToggle = {toggleHandler}>
				
				<Dropdown.Toggle as={dropButton}/>
				
				{ReactDOM.createPortal(<Dropdown.Menu 
					as={dropMenu} 
					MenuContent = {props.menuContent}
					menuStyle = {props.menuStyle}
				>
						
				</Dropdown.Menu>, document.body)}
				
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
}