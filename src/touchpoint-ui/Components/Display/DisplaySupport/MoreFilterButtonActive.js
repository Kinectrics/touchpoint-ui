import React, { useState, useEffect } from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faTimes} from '@fortawesome/free-solid-svg-icons'

export default function MoreFilterButtonActive(props) {
	
	
	const [currentValue, setCurrentValue] = useState(
		props.header.filterList[props.filterID] && props.header.filterList[props.filterID].options.value ? 
		props.header.format(props.header.filterList[props.filterID].options.value) : ''
	)
	
	function changeHandler(e) {
		setCurrentValue(e.target.value)
	}
	
	function commitHandler(){
		
		const newHeaders = [...props.dataHeaders.get()]

		newHeaders[props.header.index].addFilter({
			id: props.filterID,
			value: currentValue
		})

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
		if (currentValue.trim() === ''){
			cancelHandler()
		} else{
			commitHandler()
		}
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
				value={currentValue}
				onKeyDown = {keyDownHandler}
				onBlur={blurHandler}
			/>
			
			<span className='cancelIcon' onClick={cancelHandler} >
				<FontAwesomeIcon icon={faTimes} />
			</span>
			
		</button>
	)
}