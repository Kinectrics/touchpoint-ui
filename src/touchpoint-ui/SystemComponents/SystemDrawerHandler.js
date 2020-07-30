import React, {useEffect, useState} from 'react'
import lockedContext from '../Contexts/LockedContext'
import './SystemDrawerHandler.css'
import CloseButton from '../Components/Inputs/CloseButton'

export default function AppDrawer(props) {
	
	//Clicking the background closes the popup
	function clickBackdrop(e) {
		if (e.target.classList.contains('SystemDrawerHandler')) {
			props.drawer.close()
		}
	}
	
	// const [drawerLeft, setDrawerLeft] = useState(props.drawer.isOpen ? 'calc( var(--drawerWidth) * -1 )' : null)
	
	// useEffect(() => {
		
	// 	setDrawerLeft(props.drawer.isOpen ? 'calc( var(--drawerWidth) * -1 )' : null)
		
	// 	if(props.drawer.isOpen){
			
	// 	}
	// }, [props.drawer.isOpen])
	
	
	if(props.exists && props.drawer.isOpen){
		
		return (
			<div className="SystemDrawerHandler" onClick = {clickBackdrop}>
				
				<div 
					className={'AppDrawer'} 
					style={{...props.style}}
				>
					<lockedContext.Provider value={props.locked}>

						<CloseButton
							locked={false}
							onClick={() => {
								props.drawer.close()
							}}
						/>
						{props.children}

					</lockedContext.Provider>
				</div>
				
			</div>
		)
		
	} else return null
}