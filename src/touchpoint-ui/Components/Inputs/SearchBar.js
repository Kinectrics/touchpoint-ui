import React, {useState, useRef, useEffect} from 'react'
import useModuleData from '../../Hooks/UseModuleData'
import TextBox from './TextBox'
import PropTypes from 'prop-types'
import './SearchBar.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

export default function SearchBar(props) {
	
	const moduleData = useModuleData()
	const [searchFunction, setSearchFunction] = useState()
	const searchRef = useRef()
	const [searchBarValue, setSearchBarValue] = useState('')
	
	//search
	function searchHandler(){
		moduleData.set('TouchPointSearchText', searchRef.current.value)
		searchRef.current.focus()
	}
	
	//handles the onChange event. Only fires if component is not locked
	function changeHandler(e) {
		clearTimeout(searchFunction)
		
		setSearchBarValue(e.target.value)

		setSearchFunction(setTimeout(() => {
			searchHandler()
		}, 250))
	}
	
	return (
		<span className="SearchBar"> 
			<TextBox 
				locked = {false}
				onChange= {changeHandler}
				onEnter = {searchHandler}
				placeholder = "Search"
				value = {searchBarValue}
				inputRef = {searchRef}
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