import React, {useContext} from 'react'
import './Tile.css'
import {useState} from 'react'
import lockedContext from '../../Contexts/LockedContext'
import PropTypes from 'prop-types'

export default function Tile(props) {
	
	//When a module is clicked, a splash screen is dispalyed for a second
	const [splash, setSplash] = useState()
	
	const lockedFromAbove = useContext(lockedContext)
	const locked = props.locked || (lockedFromAbove && props.locked === undefined)
	
	function clickHandler(){
		if(!locked && props.splashScreen && props.onClick){
			setSplash('splashScreen')
			setTimeout( () => {props.onClick()}, 550)
			
		} else if(!locked && props.onClick){
			props.onClick()
		}
	}
	
	return (
		<div style = {props.style} className={"Tile " + splash} onClick = {clickHandler}> 
		
			<div className="logo flexCenter">
				{props.children}
			</div> 
			
			{props.title}
			
		</div>
	)
	
}

//Proptypes
Tile.propTypes = {
	locked: PropTypes.bool,
	title: PropTypes.string,
	splashScreen: PropTypes.bool,
	onClick: PropTypes.func,
	style: PropTypes.object,
}
