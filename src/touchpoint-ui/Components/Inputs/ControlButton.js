import React from 'react'
import CoreButton from './CoreButton'
import PropTypes from 'prop-types'

import './ControlButton.css'

export default function ControlButton(props) {
	return (
		<CoreButton
			locked={props.locked}
			onClick ={props.onClick}
			hidden={props.hidden}
			className = {"ControlButton"}
		>
			{props.children}
		</CoreButton>
	)
}

//Proptypes
ControlButton.propTypes = {
	locked: PropTypes.bool,
	onClick: PropTypes.func,
	hidden: PropTypes.bool,
}