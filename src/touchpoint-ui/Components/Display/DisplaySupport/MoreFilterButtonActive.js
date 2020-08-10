import React, {useState, useEffect} from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faTimes, faCheck} from '@fortawesome/free-solid-svg-icons'

export default function MoreFilterButtonActive(props) {
	
	const [value, setValue] = useState(props.header.filterList[props.filterID] ? props.header.filterList[props.filterID].options.value : '')
	
	function changeHandler(e) {
		setValue(e.target.value)
	}
	
	
	useEffect(()=>{
		if (props.header.filterList[props.filterID] && props.header.filterList[props.filterID].value){
			setValue(props.header.filterList[props.filterID].options.value)
		}
		
	}, [props.header.filterList[props.filterID]])
	
	
	function addFilter(argValue){
		
		const newHeaders = [...props.dataHeaders.get()]
		
		newHeaders[props.header.index].addFilter({
			id: props.filterID,
			value:  argValue
		})
		
		props.dataHeaders.set(newHeaders)
		props.data.filter()
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
	
	
	function commitHandler(){
		if (value && value.trim && value.trim() !== ''){
			addFilter(value)
		} else{
			cancelHandler()
		}
	}
	
	
	function keyDownHandler(e){
		if(e.key === 'Enter'){
			commitHandler()
			e.target.blur()
		} 
	}
	
	
	function blurHandler(){
		if (value && value.trim() === ''){
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
				value = {value}
				onKeyDown = {keyDownHandler}
				onBlur={blurHandler}
			/>
			
			<span className='cancelIcon' onClick={cancelHandler} >
				<FontAwesomeIcon icon={faTimes} />
			</span>
			
			<span className='commitIcon' onClick = {commitHandler}>
				<FontAwesomeIcon icon={faCheck} />
			</span>
			
		</button>
	)
}