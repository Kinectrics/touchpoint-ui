import React, {useState, useEffect} from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faTimes, faCheck} from '@fortawesome/free-solid-svg-icons'
import produce from 'immer'

export default function MoreFilterButtonActive(props) {
	
	const [value, setValue] = useState(props.header.filterList[props.filterID] ? props.header.filterList[props.filterID].value : '')
	
	function changeHandler(e) {
		setValue(e.target.value)
	}
	
	
	useEffect(()=>{
		if (props.header.filterList[props.filterID] && props.header.filterList[props.filterID].value){
			setValue(props.header.filterList[props.filterID].value)
		}
		
	}, [props.header.filterList[props.filterID]])
	
	
	function addFilter(argValue){
		props.dataHeaders.set(produce(props.dataHeaders.get(), h => {
			h[props.header.index].addFilter({
				id: props.filterID,
				value:  argValue
			})
		}))
		
		props.data.filter()
	}
	
	
	function cancelHandler(){
		
		props.setActive(false)
		
		//if filter exists, remove it
		if (props.header.filterList[props.filterID]){
			props.dataHeaders.set(produce(props.dataHeaders.get(), h => {
				h[props.header.index].removeFilter(props.filterID)
			}))
		}

		props.data.filter()
	}
	
	
	function commitHandler(){
		if(value.trim() !== ''){
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
		if (value.trim() === ''){
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