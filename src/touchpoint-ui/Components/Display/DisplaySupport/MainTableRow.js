import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import './MainTableRow.css'
import InputCell from './InputCell'

export default function MainTableRow(props) {

	const dynamicClass = props.dynamic ? ' dynamic ' : ''
	const pointerClass = props.setActiveRecord ? ' pointer ' : '' 

	const [activeClass, setActiveClass] = useState(props.activeRecord === props.dataRow ? ' active ' : '')
	
	function rowClickHandler(){
		if(props.setActiveRecord){
			setActiveClass(' active ')
			props.setActiveRecord(props.dataRow)
		}
	}
	
	useEffect(() => {
		setActiveClass(props.activeRecord === props.dataRow ? ' active ' : '')
	},[props.activeRecord, props.dataRow]);
	
	
	const rowContent = props.dataHeaders.map((hdr, i) => {
		if(hdr.visible){
			
			//Decide if the cell is editable or not based on the locked status, and the header onEdit function
			let cellContent = props.dataRow[hdr.headerID]
			
			if(!props.locked && hdr.onEdit && ! hdr.locked){
				cellContent = <InputCell 
					header = {hdr}
					dataRow = {props.dataRow}
					rowIndex = {props.rowIndex}
					dataset = {props.dataset}
				/>
			}
			
			//No conditional formatting
			if (!hdr.styling){
				return(<span 
					key = {hdr.headerID + props.rowKey} 
					style = {{width: hdr.width + 'px'}}
				>
					{cellContent}
				</span>)
			
			} else{
				
				//apply the styling function in the header object
				const myStyle = hdr.styling(props.dataRow[hdr.headerID], props.dataRow)
				
				return( //with coniditional formatting
					<span className = 'badge' key = {hdr.headerID + props.rowKey + i} style = {{
						width: 'calc(' + hdr.width + 'px - 23px)',
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
			className={'MainTableRow ' + dynamicClass + pointerClass + activeClass} 
			onClick = {rowClickHandler}
		>
			{rowContent}
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