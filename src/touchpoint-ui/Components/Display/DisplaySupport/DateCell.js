import React, {useEffect, useState} from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import MenuButton from '../MenuButton'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function DateCell(props) {
	
	const [selectedDate, setSelectedDate] = useState(()=>{
		return props.initalValue ? new Date(props.header.parse(props.initalValue)) : new Date()
	})
	
	function dateSelectHandler(d){
		props.selectHandler({target:{
			value: props.header.format(d)
		}})
		
		setSelectedDate(d)
	}

	return (
		<span className='dateCellWrapper'>
			<input
				className={'InputCell input ' + props.validClass}
				onKeyDown={props.keyHandler}
				onFocus={props.focusHandler}
				value={props.currentValue}
				onChange={props.changeHandler}
				onBlur={() => props.commitChanges()}
			/>

			<MenuButton style={{ opacity: '50%' }} menuStyle={{ height: 'fit-content', width: 'fit-content' }} menuContent={
				<div className='dateCellMenu'>
					<DatePicker
						selected={selectedDate}
						onChange={dateSelectHandler}
						inline
					/>
				</div>
			}><FontAwesomeIcon icon={faCalendar} /></MenuButton>

		</span>
	)
}
