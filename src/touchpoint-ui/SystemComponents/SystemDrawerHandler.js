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
				<lockedContext.Provider value={props.locked}>
					<div 
						className={'AppDrawer ' + props.className} 
						style={{...props.style, left: drawerLeft, opacity: '93%'}}
					>
						<div className="drawerContainer" style={props.innerStyle}>
							<div style={{
								width: '100%',
								height: '100%',
								display: props.drawer.isOpen ? null : 'none'
							}}>
								<h1>{props.title}</h1>
								<CloseButton
									locked={false}
									onClick={() => {
										props.drawer.close()
									}}
								/>
								{props.children}
							</div>
						</div>
					</div>
				</lockedContext.Provider>
			</div>
		)
		
	} else return null
}