import React, {useState, useContext} from 'react'
import lockedContext from '../../Contexts/LockedContext'
import TextBox from './TextBox'
import PropTypes from 'prop-types'
import './SearchBar.css'

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

export default function SearchBar(props) {
	
	const [searchText, setSearchText] = useState(props.defaultValue)
	
	//deccides if the component is locked based on props and parents in the tree
	const lockedFromAbove = useContext(lockedContext)
	const locked = props.locked || (lockedFromAbove && props.locked ===undefined)
	
	//Search button click event
	function searchHandler(e){
		if(!locked && props.onSearch){
			props.onSearch(e, searchText)
		} 
	}
	
	//handles the onChange event. Only fires if component is not locked
	function changeHandler(e){
		setSearchText(e.target.value)
		
		if(!locked && props.onChange){
			props.onChange(e)
		} 
	}
	
	return (
		<span className="SearchBar"> 
			<TextBox 
				locked = {props.locked}
				defaultValue = {props.defaultValue}
				onChange= {changeHandler}
				hidden = {props.hdden}
				onEnter = {props.onSearch}
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
	locked: PropTypes.bool,
	defaultValue: PropTypes.string,
	onChange: PropTypes.func,
	hidden: PropTypes.bool,
	onSearch: PropTypes.func,
	onBlur: PropTypes.func
}
