import React from 'react'
import CoreButton from './CoreButton'
import PropTypes from 'prop-types'

import './FreeButton.css'

export default function FreeButton(props) {
	
	let purpose = 'neutral '
	let wideClass = ''
	if (props.purpose){purpose = props.purpose.toLowerCase()}
	if (props.wide){wideClass = 'wide '}
	
	
	return (
		<CoreButton
			locked={props.locked}
			onClick ={props.onClick}
			hidden={props.hidden}
			className = {"FreeButton " + purpose + ' ' + wideClass + ' ' + props.className}
			style = {props.style}
			type={props.type}
			loading={props.loading}
			tabIndex={props.tabIndex}
			title={props.title}
		>
			{props.children}
		</CoreButton>
	)
}

//Proptypes
FreeButton.propTypes = {
	locked: PropTypes.bool,
	onClick: PropTypes.func,
	hidden: PropTypes.bool,
	purpose: PropTypes.string,
	wide: PropTypes.bool,
	style: PropTypes.object,
	type: PropTypes.string,
	loading: PropTypes.bool,
	tabIndex: PropTypes.any,
	title: PropTypes.string,
}