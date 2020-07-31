import React, {useContext} from 'react'
import './InfoCard.css'
import lockedContext from '../../Contexts/LockedContext'
import PropTypes from 'prop-types'
import CloseButton from '../Inputs/CloseButton'

export default function InfoCard(props) {
	
	//locking the item. If a component somewhere above in the tree is locked, the context will 
	//cause this card to be locked as well
	const lockedFromAbove = useContext(lockedContext)
	const locked = props.locked || (lockedFromAbove && props.locked ===undefined)
	
	//Assign classes based on props 
	let stripe = '' //Adds a stripe down the left side
	const hasStripe = props.stripe || props.stripeColor
	if(hasStripe && !props.titleBar){stripe = 'stripe'}
	
	//Adds hover and click effects in the x, y or xy directions
	let dynamic = '' //dynamic effects are ignored if locked
	if(!locked){
		if (props.dynamicX){dynamic = 'dynamicX '}
		if (props.dynamicY){dynamic = dynamic + ' dynamicY '}
	} 
	
	//handles the onClick event. Only fires if the component is not locked
	function clickHandler(e){
		if(!locked && props.onClick !== undefined){
			props.onClick(e)
		} 
	}
	
	function closeHandler(e){
		e.stopPropagation()
		props.onClose()
	}
	
	//If a title prop is provided, create an H1
	let titleBar
	if(props.title){titleBar = <h1>{props.title}</h1>}
	
	let closeButton
	if(props.onClose){
		closeButton = <CloseButton onClick = {closeHandler}></CloseButton>
	}
	
	const stripeStyle = props.stripeColor ? {
		borderLeftColor: props.stripeColor 
	} : undefined
		
	//if 'hidden' prop is true then dont show the component
	if(props.hidden){return null} else{
		
		return (
			<div 
				className={"InfoCard " + dynamic + ' ' + props.className} 
				onClick = {clickHandler} 
				style = {props.style}
			>
					
				<lockedContext.Provider value = {locked}>
					
					<div className="cardContainer" style = {props.innerStyle}>	
						<div className={"textBox " + stripe} style = {stripeStyle}>
							{closeButton}
							{titleBar}
							{props.children}
						</div>
					</div>
					
				</lockedContext.Provider>
			</div>
		)
	}
}

//Proptypes
InfoCard.propTypes = {
	title: PropTypes.string,
	stripe: PropTypes.bool,
	dynamicX: PropTypes.bool,
	dynamicY: PropTypes.bool,
	locked: PropTypes.bool,
	hidden: PropTypes.bool,
	onClick: PropTypes.func,
	width: PropTypes.string,
	height: PropTypes.string,
	className: PropTypes.string,
	onClose: PropTypes.func,
	style: PropTypes.object,
}
