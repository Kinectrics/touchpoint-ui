import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import lockedContext from '../../Contexts/LockedContext'
import InfoCard from '../Containers/InfoCard'
import './Popup.css'
import useSystem from '../../Hooks/UseSystem'

export default function Popup(props) {
	const system = useSystem()
	
	const lockedFromAbove = useContext(lockedContext)
	const locked = props.locked || (lockedFromAbove && props.locked ===undefined)
	
	//Clicking the background closes the popup
	let handleCloseButton
	if(!props.forceOpen){
		handleCloseButton = () => {
			if(!props.forceOpen){
				system.closePopup()
			}
		}	
	}
	
	return(
		<lockedContext.Provider value={locked}>
			
			<InfoCard 
				className = {'Popup '}
				stripe
				title = {props.title}
				width = {props.width}
				height = {props.height}
				onClose ={handleCloseButton}
				style = {props.style}
			>
				{props.children}
			</InfoCard>
			
		</lockedContext.Provider>
	)
}

//Proptypes
Popup.propTypes = {
	title: PropTypes.string,
	onClose: PropTypes.func,
	forceOpen: PropTypes.bool,
	width: PropTypes.string,
	height: PropTypes.string,
	locked: PropTypes.bool,
	style: PropTypes.object,
}