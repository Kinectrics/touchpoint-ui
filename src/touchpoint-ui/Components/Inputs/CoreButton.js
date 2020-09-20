import React, {useContext} from 'react'
import lockedContext from '../../Contexts/LockedContext'
import PropTypes from 'prop-types'
import './CoreButton.css'


export default function CoreButton(props) {
	
	//deccides if the component is locked based on props and parents in the tree
	const lockedFromAbove = useContext(lockedContext)
	const locked = props.locked || (lockedFromAbove && props.locked ===undefined)
	
	let lockedClass = ''
	if (locked){lockedClass = 'locked '}
	
	//handles the onChange event. Only fires if component is not locked
	function clickHandler(e){
		if(!locked && props.onClick !== undefined){
			props.onClick(e)
		} 
	}
	
	if(!props.hidden){return (
		
		<button className={'CoreButton ' + lockedClass + ' ' + props.className}
			onClick ={clickHandler}
			style = {props.style}
			onBlur = {props.onBlur}
			type={props.type}
		>
			{props.children}
		</button>
		
	)} else{return null}
}

//Proptypes
CoreButton.propTypes = {
	locked: PropTypes.bool,
	onClick: PropTypes.func,
	hidden: PropTypes.bool,
	className: PropTypes.string,
	style: PropTypes.object,
	onBlur: PropTypes.func,
	type: PropTypes.string,
}