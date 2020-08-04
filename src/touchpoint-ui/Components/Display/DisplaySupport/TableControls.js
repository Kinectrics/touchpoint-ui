import React from 'react'
import ColumnSettings from './ColumnSettings'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons'
import useSystem from '../../../Hooks/UseSystem'
import SaveTableLayout from './SaveTableLayout'


export default function TableControls(props) {
	let clearFilterButton = null
	let sortButton = null
	let filterButton = null
	let settingsButton = null
	
	if (props.hasFilter && !props.noFilter) {
		clearFilterButton = <button
			onClick={props.clearFilter}
		><FontAwesomeIcon icon={faTimesCircle} /> Clear Filter</button>
	}

	if (!props.noFilter) {
		filterButton = <SaveTableLayout 
			headers = {props.headers}
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

	return (
		<div className='tableControls'>
			{settingsButton}
			{sortButton}
			{filterButton}
			{clearFilterButton}
		</div>
	)
}