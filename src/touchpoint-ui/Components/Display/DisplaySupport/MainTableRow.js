import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import './MainTableRow.css'
import InputCell from './InputCell'

export default function MainTableRow(props) {

	let dynamicClass = ''
	let pointerClass = ''
	if(props.dynamic){dynamicClass = 'dynamic'}
	if(props.setActiveRecord){pointerClass = 'pointer'}
	
	//Check if this is the active row for style reasons 
	const [activeClass, setActiveClass] = useState('')
	
	//sends the dataRow object to the select record function
	function rowClickHandler(){
		if(props.setActiveRecord){
			setActiveClass('active')
			props.setActiveRecord(props.dataRow)
		}
	}
	
	useEffect(() => {
		if(props.activeRecord === props.dataRow) {setActiveClass('active')} else{
			setActiveClass('')
		}
	},[props.activeRecord, props.dataRow]);
	
	//Only continue building the row if it's actually required
	const row = props.dataHeaders.map(hdr => {
		if(hdr.visible){
			//Decide if the cell is editable or not based on the locked status, and the header onEdit function
			let cellContent = props.dataRow[hdr.headerID]
			if(!props.locked && hdr.onEdit && ! hdr.locked){
				cellContent = <InputCell 
					dataHeader = {hdr} 
					defaultValue = {cellContent}
					dataRow = {props.dataRow}
				/>
			}
			
			//No conditional formatting
			if (!hdr.styling){return(<span 
				key = {hdr.headerID+props.rowKey} 
				style = {{width: hdr.width + 'px'}}
			>
				{cellContent}
			</span>)
			
			} else{
				
				//apply the styling function in the header object
				const myStyle = hdr.styling(props.dataRow[hdr.headerID], props.dataRow)
				
				return( //with coniditional formatting
					
					<span className = 'badge' key = {hdr.headerID+props.rowKey} style = {{
						width: 'calc(' + hdr.width + 'px - 23px',
						color: myStyle.textColor,
						backgroundColor: myStyle.badgeColor,
						marginLeft: '23px'
					}}>
						{cellContent}
					</span>
				)
			}
		}
	})
	
	
	// only the row if it passes the filter
	return(
		<div 
			className={'MainTableRow ' + dynamicClass + ' ' + pointerClass} 
			onClick = {rowClickHandler}
		>
			<div className={"rowContainer " + activeClass}>
				{row}
			</div>
		</div>
	)
}

//Proptypes
MainTableRow.propTypes = {
	dataHeaders: PropTypes.array.isRequired,
	dataRow: PropTypes.object.isRequired,
	setActiveRecord: PropTypes.func,
	locked: PropTypes.bool,
	dynamic:PropTypes.bool
}