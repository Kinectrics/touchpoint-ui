import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types';
import lockedContext from '../../Contexts/LockedContext'
import radioContext from '../../Contexts/RadioContext'
import {v4 as uuid} from 'uuid'


export default function RadioGroup(props) {
	
	//decides if the component is locked based on props and parents in the tree
	const lockedFromAbove = useContext(lockedContext)
	const locked = props.locked || (lockedFromAbove && props.locked === undefined)
	const [groupName] = useState(uuid())
	
	function onChange(value){
		if(props.onChange){
			props.onChange(value, props.groupID)
		}
	}
	
	const radioData = {
		onChange: onChange,
		groupName: groupName,
		locked: locked,
		defaultValue: props.defaultValue
	}
	
	return (
		<radioContext.Provider value={radioData}>
			{props.children}
		</radioContext.Provider>
	)
}

//Proptypes
RadioGroup.propTypes = {
	defaultValue: PropTypes.string,
	onChange: PropTypes.func,
	locked: PropTypes.bool,
	groupID: PropTypes.any,
}

