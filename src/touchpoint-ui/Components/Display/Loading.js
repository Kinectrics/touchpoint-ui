import React from 'react'
import {faCircleNotch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import './Loading.css'
import propTypes from 'prop-types'

export default function Loading(props) {
	return (
		<span className = {'Loading ' + props.className} style={props.style} >
			<span className={props.animation ? props.animation : 'rotate'}>
				{props.children ? props.children : <FontAwesomeIcon icon={faCircleNotch} />}
			</span> 
		</span>
	)
}

Loading.propTypes={
	className: propTypes.string,
	style: propTypes.object,
	animation: propTypes.string,
}