import React from 'react'
import './SystemPopupHandler.css'

export default function SystemPopupHandler(props) {
	
	const num = props.activePopups.length
	
	//Clicking the background closes the popup
	function clickBackdrop(e){
		if (e.target.classList.contains('systemPopupBackdrop')){
			props.system.Popup.closeAll()
		}
	}
	
	//If the active popup isn't null, render it
	if(num === 0){return null}
	
	return(
		props.activePopups.map((Pop, idx)=>{
			return <div 
				className={"systemPopupBackdrop " + props.popupEffect}
				onClick={clickBackdrop}
				key = {idx}
				style={{
					display: idx === num - 1 ? null :  'none',
					width: '100%',
					height: '100%',
				}}
			>
				{typeof (Pop) == 'function' ? <Pop {...props.popupProps[idx]}/> : Pop}
			</div> 
		})
	)	
}