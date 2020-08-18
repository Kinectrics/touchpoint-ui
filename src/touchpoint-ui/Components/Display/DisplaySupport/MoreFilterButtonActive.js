import React, {useState, useEffect} from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faTimes, faCheck} from '@fortawesome/free-solid-svg-icons'

export default function MoreFilterButtonActive(props) {
	
	function changeHandler(e) {
		const newHeaders = [...props.dataHeaders.get()]
		
		if (props.header.filterList[props.filterID]){
			newHeaders[props.header.index].filterList[props.filterID].value = e.target.value
			
		} else{
			newHeaders[props.header.index].addFilter({
				id: props.filterID,
				value: e.target.value
			})
		}
		
		props.dataHeaders.set(newHeaders)
	}
	
	function cancelHandler(){
		
		props.setActive(false)
		
		//if filter exists, remove it
		if (props.header.filterList[props.filterID]){
			const newHeaders = [...props.dataHeaders.get()]
			newHeaders[props.header.index].removeFilter(props.filterID)
			props.dataHeaders.set(newHeaders)

		}

		props.data.filter()
	}
	
	function keyDownHandler(e){
		if(e.key === 'Enter'){
			e.target.blur()
		} 
	}
	
	
	function blurHandler(e){
		if (e.target.value.trim() === ''){
			cancelHandler()
		}
	}
	
	
	function getFilterValue(){
		if (props.header.filterList[props.filterID]){
			return props.header.filterList[props.filterID].value ? props.header.filterList[props.filterID].value : ''
		} else return ''
	}
	
	return(
		<button 
			className='MoreFilterButtonActive disabled' 
		>
			
			<span className = 'tag'>{props.filter.displayName}</span>
			<br/>
			
			<input 
				className = {'input wrap'}
				autoFocus
				onChange = {changeHandler}
				value={getFilterValue()}
				onKeyDown = {keyDownHandler}
				onBlur={blurHandler}
			/>
			
			<span className='cancelIcon' onClick={cancelHandler} >
				<FontAwesomeIcon icon={faTimes} />
			</span>
			
		</button>
	)
}