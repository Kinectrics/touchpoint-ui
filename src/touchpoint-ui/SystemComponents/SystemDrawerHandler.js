import React, {useEffect, useState} from 'react'
import lockedContext from '../Contexts/LockedContext'
import './SystemDrawerHandler.css'
import CloseButton from '../Components/Inputs/CloseButton'

export default function AppDrawer(props) {
	
	
	const trueLeft = props.style && props.style.width ? props.style.width : 'var(--drawerWidth)'
	const [drawerLeft, setDrawerLeft] = useState(!props.drawer.isOpen ? 'calc( ' + trueLeft + ' * -1 )' : null)
	
	useEffect(()=>{
		setDrawerLeft(!props.drawer.isOpen ? 'calc( ' + trueLeft + ' * -1 )' : null)
	},[props.drawer.isOpen])
	
	//Clicking the background closes the popup
	function clickBackdrop(e) {
		if (e.target.classList.contains('SystemDrawerHandler')) {
			props.drawer.close()
		}
	}
	
	const handlerClass = props.drawer.isOpen ? 'SystemDrawerHandler' : ''
	
	if(props.exists){
		
		return (
			<div className={handlerClass} onClick = {clickBackdrop}>
				
				<div 
					className={'AppDrawer'} 
					style={{...props.style, left: drawerLeft}}
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