import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import './Dock.css'
import usePresence from '../../Hooks/UsePresence'
import lockedContext from '../../Contexts/LockedContext'

export default function Dock(props) {
	
	usePresence('TouchPointDock', 0, 'var(--dockWidth)')
	
	//locking the item. If a component somewhere above in the tree is locked, the context will 
	const lockedFromAbove = useContext(lockedContext)
	const locked = props.locked || (lockedFromAbove && props.locked === undefined)
	
	return (
		<div className = 'Dock' style = {props.style}>
			<lockedContext.Provider value={locked}>
				{props.children}
			</lockedContext.Provider>
		</div>
	)
}

Dock.propTypes={
	locked: PropTypes.bool,
	style: PropTypes.object,
}
