import React, {useState, useRef, useEffect} from 'react'
import useModuleData from '../../Hooks/UseModuleData'
import TextBox from './TextBox'
import PropTypes from 'prop-types'
import './SearchBar.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faTimesCircle} from "@fortawesome/free-solid-svg-icons"

export default function SearchBar(props) {
	
	
	const moduleData = useModuleData()
	const [searchFunction, setSearchFunction] = useState()
	const searchRef = useRef()
	const [searchBarValue, setSearchBarValue] = useState('')
	
	const searchContext = moduleData.get('TouchPointSearchText')
	
	function focusSearchBar(){
		searchRef.current.focus()
	}
	
	
	//ctrl f handler
	function keyDownHandler(e) {
		const isCtrl = e.ctrlKey || e.metaKey

		if (isCtrl && e.keyCode === 70) {
			e.preventDefault()
			focusSearchBar()
		}
	}
	
	
	useEffect(() => {
		window.addEventListener('keydown', keyDownHandler)

		return (() => {
			moduleData.clear()
			window.removeEventListener('keydown', keyDownHandler)
		})

	}, [])
	
	useEffect(()=>{
		setSearchBarValue(searchContext ? searchContext : '')
	}, [searchContext])
	
	
	//search
	function searchHandler(){
		moduleData.set('TouchPointSearchText', searchRef.current.value)
		searchRef.current.focus()
	}
	
	//clear
	function clearHandler() {
		moduleData.set('TouchPointSearchText', '')
		setSearchBarValue('')
		searchRef.current.focus()
	}
	
	
	//handles the onChange event. Only fires if component is not locked
	function changeHandler(e) {
		clearTimeout(searchFunction)
		
		setSearchBarValue(e.target.value)

		setSearchFunction(setTimeout(() => {
			searchHandler()
		}, 250))
		
		if(props.onChange){
			props.onChange(e.target.value)
		}
	}
	
	
	return(
		<span className="SearchBar"> 
			<TextBox 
				locked = {false}
				onChange= {changeHandler}
				onEnter = {searchHandler}
				placeholder = "Search"
				value = {searchBarValue}
				inputRef = {searchRef}
				style = {props.style}
				tabIndex={props.tabIndex}
			/>
			
			{searchBarValue ? <button className="searchButton"
				onClick = {clearHandler}
			>
				<FontAwesomeIcon icon={faTimesCircle} />
			</button> : null}
			
			{searchBarValue && props.nestedComponent ? <div className='searchComponentWrapper' style={props.nestedProps ? props.nestedProps.style : null}>
				
				{typeof (props.nestedComponent) == 'function' ? 
				<props.nestedComponent {...props.nestedProps} searchBarValue={searchBarValue}/> 
				: props.nestedComponent}
				
			</div>: null}
		</span>
	)
}


//Proptypes
SearchBar.propTypes = {
	defaultValue: PropTypes.string,
	style: PropTypes.object,
	onChange: PropTypes.func,
	tabIndex: PropTypes.any,
}