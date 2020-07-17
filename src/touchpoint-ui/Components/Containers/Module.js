import React, {useState} from 'react'
import './Module.css'
import moduleContext from '../../Contexts/ModuleContext'
import PropTypes from 'prop-types'

export default function Module(props) {

	const [searchText, setSearchText] = useState('')
	
	const moduleData ={
		searchText: searchText,
		setSearchText: setSearchText
	}
	
	return (
		<moduleContext.Provider value ={moduleData}>
			
			<div className={'Module ' + props.moduleName}>
				{props.children}	
			</div>
			
		</moduleContext.Provider>
	)
}

//Proptypes
Module.propTypes = {
	moduleName: PropTypes.string,
}
