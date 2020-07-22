import React, {useState} from 'react'
import './Module.css'
import moduleContext from '../../Contexts/ModuleContext'
import PropTypes from 'prop-types'

export default function Module(props) {

	
	return (
		<div className={'Module ' + props.moduleName}>
			{props.children}	
		</div>
	)
}

//Proptypes
Module.propTypes = {
	moduleName: PropTypes.string,
}
