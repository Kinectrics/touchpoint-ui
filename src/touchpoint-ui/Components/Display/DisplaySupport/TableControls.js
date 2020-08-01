import React from 'react'
import TableSettings from './TableSettings'
import MenuButton from '../MenuButton'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faTimesCircle, faFilter, faSortAmountUp } from '@fortawesome/free-solid-svg-icons'
import Popup from '../Popup'
import TextBox from '../../Inputs/TextBox'
import FreeButton from '../../Inputs/FreeButton'
import useSystem from '../../../Hooks/UseSystem'

export default function TableControls(props) {
	let clearFilterButton = null
	let sortButton = null
	let filterButton = null
	let settingsButton = null
	
	const System = useSystem()

	if (props.hasFilter && !props.noFilter) {
		clearFilterButton = <button
			onClick={props.clearFilter}
		><FontAwesomeIcon icon={faTimesCircle} /> Clear Filter</button>
	}

	if (!props.noFilter) {
		filterButton = <MenuButton locked = {false} menuContent={
			<div>
				<MenuButton locked={false} menuContent={
					<div>
						<button>Outstanding Tasks</button>
						<button>Assigned To Me</button>
						<button>Due Soon</button>
					</div>
				}>Saved Filters</MenuButton>

				<button onClick={() => {
					System.Popup.open(<Popup title='Save Filter'>
						<label>Filter Name: </label><TextBox autoFocus />
						<FreeButton
							onClick={() => {
								System.Popup.close()
							}}
						>Save</FreeButton>
					</Popup>)
				}}
				>Save Current Filter</button>

			</div>
		}>
			<span className='smallIcon'>
				<FontAwesomeIcon icon={faFilter} />
			</span> Filter
		</MenuButton>
	}

	if (!props.noSort) {
		sortButton = <MenuButton locked = {false} menuContent={
			<MenuButton locked={false} menuContent={
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