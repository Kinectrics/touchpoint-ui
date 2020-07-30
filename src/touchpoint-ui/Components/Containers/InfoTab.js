import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import lockedContext from '../../Contexts/LockedContext'

export default function InfoTab(props) {
	
	const lockedFromAbove = useContext(lockedContext)
	const locked = props.locked || (lockedFromAbove && props.locked === undefined)
	
	if(!props.hidden){return (
		<lockedContext.Provider value={locked}>
			
			<div className = {'InfoTab ' + props.tabID} style = {props.style}>
				{props.children}
			</div>
			
		</lockedContext.Provider>
	)} else return null
}

//Proptypes
InfoTab.propTypes = {
	tabTitle: PropTypes.string,
	tabID: PropTypes.string.isRequired,
	style: PropTypes.object,
}
