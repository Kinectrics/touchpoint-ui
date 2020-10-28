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
			if(props.onCollapse){ props.onCollapse()}
		} else{
			e.stopPropagation()
			setExpanded(true)
			if(props.onExpand){props.onExpand(e)}
			e.stopPropagation()
		}
	}
	
	function blurHandler(){
		setExpanded(false)
		if(props.onCollapse){ props.onCollapse()}
	}
	
	return (
		<CoreButton
			className = {props.className + ' ConfirmButton ' + 
				(expanded ? ' expanded ' : '') + props.purpose
			}
			title={props.title}
			locked = {props.locked}
			hidden = {props.hidden}
			onClick = {clickHandler}
			style = {expanded ? {...props.style, ...props.expandedStyle} : props.style}
			loading = {props.loading}
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
	loading: PropTypes.bool,
	title: PropTypes.string,
	onExpand: PropTypes.func,
	onCollapse: PropTypes.func,
}