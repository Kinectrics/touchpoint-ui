import React, {useContext, useState} from 'react'
import PropTypes from 'prop-types'
import './ControlBar.css'
import SearchBar from './SearchBar'
import lockedContext from '../../Contexts/LockedContext'

export default function ControlBar(props) {
	
	const lockedFromAbove = useContext(lockedContext)
	const locked = props.locked || (lockedFromAbove && props.locked ===undefined)
	
	
	if(props.searchBar){
		
		return (
			<lockedContext.Provider value = {locked}>
				<div className="ControlBar flexY" style = {props.style}>
					
					<div className="searchContainer">
						<SearchBar />
					</div>
					
					<div className="buttonContainer flexY" >{props.children}</div>
				</div>
			</lockedContext.Provider>
				
		)
		
	} else{
		
		return (
			<lockedContext.Provider value = {locked}>
				<div className="ControlBar flexY" style={props.style}>
					<div className="buttonContainer">{props.children}</div>
				</div>
			</lockedContext.Provider>
			
		)
	}
}

//Proptypes
ControlBar.propTypes = {
	searchBar: PropTypes.bool,
	searchBarProps: PropTypes.object,
	locked: PropTypes.bool, 
	style: PropTypes.object,
}

