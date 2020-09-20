import React, {useContext} from 'react'
import './Tile.css'
import lockedContext from '../../Contexts/LockedContext'
import PropTypes from 'prop-types'

export default function Tile(props) {
	
	const lockedFromAbove = useContext(lockedContext)
	const locked = props.locked || (lockedFromAbove && props.locked === undefined)
	
	function clickHandler(){
		if(!locked && props.onClick){
			props.onClick()
		}
	}
	
	const notifications = props.notifications < 99 ? props.notifications : '99+'
	
	const notificationBadge = props.notifications && !locked ?
	<span className='notifications'>{notifications}</span>
	: null
	
	return (
		<div style={props.style} className={'Tile' + (locked ? ' locked ' : '')}>
			<div style = {props.innserStyle} className={'TileContainer '} onClick = {clickHandler}> 
				{notificationBadge}
				<div className='logo flexCenter'>
					{props.children}
				</div> 
				
				<div className="title">{props.title}</div>
			</div>
		</div>
	)
	
}

//Proptypes
Tile.propTypes = {
	locked: PropTypes.bool,
	title: PropTypes.string,
	onClick: PropTypes.func,
	style: PropTypes.object,
}
