import React from 'react'
import TableSettings from './TableSettings'
import MenuButton from '../MenuButton'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faTimesCircle, faFilter, faSortAmountUp } from '@fortawesome/free-solid-svg-icons'

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
		filterButton = <MenuButton menuContent = {
			<button>Filter and Such</button>
		}>
			<span className='smallIcon'>
				<FontAwesomeIcon icon={faFilter} />
			</span> Filter
		</MenuButton>
	}

	if (!props.noSort) {
		sortButton = <MenuButton menuContent={
			<MenuButton menuContent={
				<div>
					<button>test2</button>
					<button>test2</button>
					<button>test2</button>
				</div>
			}>test</MenuButton>
		}>
			<FontAwesomeIcon icon={faSortAmountUp} /> Sort
		</MenuButton>
	}

	if (!props.noOptions) {
		settingsButton = <TableSettings
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
