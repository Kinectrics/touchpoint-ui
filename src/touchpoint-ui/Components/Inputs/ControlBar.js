import React, {useContext, useState} from 'react'
import PropTypes from 'prop-types'
import './ControlBar.css'
import SearchBar from './SearchBar'
import lockedContext from '../../Contexts/LockedContext'
import moduleContext from '../../Contexts/ModuleContext'

export default function ControlBar(props) {
	
	const lockedFromAbove = useContext(lockedContext)
	const locked = props.locked || (lockedFromAbove && props.locked ===undefined)
	
	const moduleData = useContext(moduleContext)
	const [searchState, setSearchState] = useState(()=>{})
	
	//search
	function searchHandler(e){
		moduleData.setSearchText(e.target.value)
	}
	
	//start searching after thet person has finished typing, using a 1 second delay
	function changeHandler(e){
		clearTimeout(searchState)
		e.persist()
		
		setSearchState(setTimeout(()=>{
			searchHandler(e)
		}, 250))
	}
	
	if(props.searchBar){
		
		return (
			<lockedContext.Provider value = {locked}>
				<div className="ControlBar flexY">
					<div className="buttonContainer">{props.children}</div>
					<div className="searchContainer">
						<SearchBar 
							locked = {false}
							onChange = {changeHandler}
							onSearch = {searchHandler}
						/>
					</div>
				</div>
			</lockedContext.Provider>
				
		)
		
	} else{
		
		return (
			<lockedContext.Provider value = {locked}>
				<div className="ControlBar flexY">
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
	locked: PropTypes.bool
}

