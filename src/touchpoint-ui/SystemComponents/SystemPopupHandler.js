import React from 'react'
import './SystemPopupHandler.css'

export default function SystemPopupHandler(props) {
	
	//Clicking the background closes the popup
	function clickBackdrop(e){
		if(e.target.classList.contains('systemPopupBackdrop') && (!props.activePopup.props.forceOpen)){
			props.system.Popup.close()
		}
	}
	
	let forceClass = ''
	if(props.activePopup!==null && props.activePopup.props.forceOpen){forceClass = 'forceOpen'}
	
	//If the active popup isn't null, render it
	if(props.activePopup != null){
		
		return (
			<div 
				className = {"systemPopupBackdrop " + props.popupEffect + ' ' + forceClass} 
				onClick = {clickBackdrop}
			>
				{typeof (props.activePopup) == 'function' ? <props.activePopup /> : props.activePopup}
			</div>
		)
			
	} else return null
}
