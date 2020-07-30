import React from 'react'
import PropTypes from 'prop-types'
import CoreButton from './CoreButton'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import './CloseButton.css'


export default function CloseButton(props) {
	
	return (
		<CoreButton 
			className = 'CloseButton'
			onClick = {props.onClick}
			locked = {props.locked}
			hidden = {props.hidden}
			style = {props.style}
		>
			<FontAwesomeIcon icon={faTimes}/>
		</CoreButton>
	)
}

//Proptypes
CloseButton.propTypes = {
	locked: PropTypes.bool,
	onClick: PropTypes.func,
	hidden: PropTypes.bool,
	style: PropTypes.object,
}


