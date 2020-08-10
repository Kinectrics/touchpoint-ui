import React, {useContext, useEffect} from 'react'
import PropTypes from 'prop-types'
import lockedContext from '../../Contexts/LockedContext'
import InfoCard from '../Containers/InfoCard'
import './Popup.css'
import useSystem from '../../Hooks/UseSystem'

export default function PopupCard(props) {
	const system = useSystem()
	
	const lockedFromAbove = useContext(lockedContext)
	const locked = props.locked || (lockedFromAbove && props.locked === undefined)
	
	//Clicking the background closes the popup
	let handleCloseButton
	if(!props.forceOpen){
		handleCloseButton = () => {
			if(!props.forceOpen){
				system.Popup.close()
			}
		}	
	}
	
	useEffect(()=>{
		if(props.onOpen){ props.onOpen() }
		
		return(()=>{
			if(props.onClose){ props.onClose() }
		})
		
	},[])
	
	return(
		<lockedContext.Provider value={locked}>
			
			<InfoCard 
				className = {'Popup '}
				stripe
				title = {props.title}
				onClose ={handleCloseButton}
				style = {{...props.style}}
				innerStyle = {{borderColor: props.stripeColor}}
				stripeColor = {props.stripeColor}
			>
				{props.children}
			</InfoCard>
			
		</lockedContext.Provider>
	)
}

//Proptypes
PopupCard.propTypes = {
	title: PropTypes.string,
	onClose: PropTypes.func,
	onOpen: PropTypes.func,
	forceOpen: PropTypes.bool,
	width: PropTypes.string,
	height: PropTypes.string,
	locked: PropTypes.bool,
	style: PropTypes.object,
}