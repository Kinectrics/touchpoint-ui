import React, {useEffect, useContext} from 'react'
import './Module.css'
import PropTypes from 'prop-types'
import useModuleData from '../../Hooks/UseModuleData'
import lockedContext from '../../Contexts/LockedContext'


export default function Module(props) {
	
	const moduleData = useModuleData()
	const lockedFromAbove = useContext(lockedContext)
	const locked = props.locked || (lockedFromAbove && props.locked === undefined)
	
	useEffect(()=>{
		moduleData.clear()
		
		return(()=>{
			moduleData.clear()
		})
		
	}, [])
	
	return (
		<div className={'Module ' + props.moduleName} style = {props.style}>
			<lockedContext.Provider value = {locked}>
				{props.children}
			</lockedContext.Provider>
		</div>
	)
}

//Proptypes
Module.propTypes = {
	moduleName: PropTypes.string,
	style: PropTypes.object,
	locked: PropTypes.bool,
}
