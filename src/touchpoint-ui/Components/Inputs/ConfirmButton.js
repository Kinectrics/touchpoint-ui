import React, {useState} from 'react'
import CoreButton from './CoreButton'
import PropTypes from 'prop-types'
import './ConfirmButton.css'

export default function ConfirmButton(props) {
	
	const [expanded, setExpanded] = useState(false)
	
	function clickHandler(e){
		if(expanded){
			if(props.onClick){props.onClick(e)}
			setExpanded(false)
		} else{
			setExpanded(true)
		}
	}
	
	function blurHandler(){
		setExpanded(false)
	}
	
	return (
		<CoreButton
			className = {props.className + ' ConfirmButton ' + 
				(expanded ? ' expanded ' : '') + props.purpose
			}
			locked = {props.locked}
			hidden = {props.hidden}
			onClick = {clickHandler}
			style = {props.style}
			onBlur = {blurHandler}
		>
			{expanded ? props.expandedContent : props.content}
		</CoreButton>
	)
}



//
ConfirmButton.propTypes = {
	hidden: PropTypes.bool,
	locked: PropTypes.bool,
	onClick: PropTypes.func,
	style: PropTypes.object,
	expandedStyle: PropTypes.object,
	className: PropTypes.string,
	content: PropTypes.any,
	expandedContent: PropTypes.any,
	purpose: PropTypes.string,
}