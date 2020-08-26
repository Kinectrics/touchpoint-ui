import React from 'react'
import ColumnSettings from './ColumnSettings'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faTimesCircle, faPlus, faMinus} from '@fortawesome/free-solid-svg-icons'
import SaveTableLayout from './SaveTableLayout'


export default function TableControls(props) {
	let clearFilterButton = null
	let layoutButton = null
	let settingsButton = null
	let expandControls
	
	if (props.hasFilter && !props.noFilter) {
		clearFilterButton = <button
			onClick={props.clearFilter}
		><FontAwesomeIcon icon={faTimesCircle} /> Clear Filter</button>
	}

	if (!props.noFilter && !props.noSort && !props.noOptions) {
		layoutButton = <SaveTableLayout 
			headers = {props.dataHeaders}
			data = {props.data}
		/>
	}
	
	if (!props.noOptions) {
		settingsButton = <ColumnSettings
			headers={props.dataHeaders}
			data={props.data}
			setTransitionClass = {props.setTransitionClass}
		/>
	}
	
	if(props.showExpandControls){
		expandControls = <>
			<button onClick={()=>{
				props.setExpandTrigger(!props.expandTrigger)
			}}><FontAwesomeIcon icon={faPlus} /> Expand All</button>
			
			<button onClick={()=>{
				props.setCollapseTrigger(!props.collapseTrigger)
			}}><FontAwesomeIcon icon={faMinus} /> Collapse All</button>
		</>
	}
	
	

	return (
		<div className='tableControls'>
			{settingsButton}
			{layoutButton}
			{expandControls}
			{clearFilterButton}
		</div>
	)
}