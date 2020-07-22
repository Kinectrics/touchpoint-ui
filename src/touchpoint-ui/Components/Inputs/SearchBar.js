import React, {useState, useContext} from 'react'
import moduleContext from '../../Contexts/ModuleContext'
import TextBox from './TextBox'
import PropTypes from 'prop-types'
import './SearchBar.css'

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

export default function SearchBar(props) {
	
	const moduleData = useContext(moduleContext)
	const [searchState, setSearchState] = useState()
	
	//search
	function searchHandler(e) {
		moduleData.setSearchText(e.target.value)
	}
	
	//handles the onChange event. Only fires if component is not locked
	function changeHandler(e) {
		clearTimeout(searchState)
		e.persist()

		setSearchState(setTimeout(() => {
			searchHandler(e)
		}, 250))
	}
	
	return (
		<span className="SearchBar"> 
			<TextBox 
				locked = {props.locked}
				onChange= {changeHandler}
				onEnter = {searchHandler}
				placeholder = "Search"
				onBlur = {props.onBlur}
			/>
			
			<button className="searchButton"
				onClick = {searchHandler}
			>
				<FontAwesomeIcon icon={faSearch} />
			</button>
			
		</span>
	)
}

//Proptypes
SearchBar.propTypes = {
	defaultValue: PropTypes.string,
}
