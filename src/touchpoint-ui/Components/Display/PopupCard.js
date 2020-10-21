import React, {useContext, useEffect} from 'react'
import PropTypes from 'prop-types'
import lockedContext from '../../Contexts/LockedContext'
import InfoCard from '../Containers/InfoCard'
import './PopupCard.css'
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
		
		function handlKeypress(e){
			if (e.key === 'Escape' && !props.forceOpen){
				system.Popup.close()
			}
		}
		
		document.addEventListener('keydown', handlKeypress)
		
		return(()=>{
			if(props.onClose){ props.onClose() }
			document.removeEventListener('keydown', handlKeypress)
		})
		
	},[])
	
	
	const content = <lockedContext.Provider value={locked}>
		
			<InfoCard
				className={'PopupCard '}
				stripe
				title={props.title}
				onClose={handleCloseButton}
				style={{ height: 'auto', ...props.style }}
				innerStyle={{ borderColor: props.stripeColor, ...props.innerStyle }}
				stripeColor={props.stripeColor}
			>
				{props.children}
			</InfoCard>
	</lockedContext.Provider>
	
	if(props.forceOpen){return (<div className={'popupBlockClicks'}>{content}</div>)}
	return content
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
	innerStyle: PropTypes.object,
}