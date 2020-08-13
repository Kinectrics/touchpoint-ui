import React, {useEffect, useState} from 'react'
import './MainTableRow.css'
import InputCell from './InputCell'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

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
			
			
			if (!hdr.styling){ //No conditional formatting
				return(<span 
					key = {hdr.headerID + props.rowKey} 
					style = {{width: hdr.width + 'px'}}
				>
					{cellContent}
				</span>)
			
			} else{ //with coniditional formatting
				
				
				const myStyle = hdr.styling(props.dataRow[hdr.headerID], props.dataRow)
				
				return( 
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
	
	const [expanded, setExpanded] = useState(false)
	const expandedClass = expanded ? ' expanded ' : ''
	const expandIcon = expanded ? <FontAwesomeIcon icon={faMinus} /> : <FontAwesomeIcon icon={faPlus} />
	
	function expandHandler(){
		setExpanded(!expanded)
	}
	
	return(
		<div
			className={'MainTableRow ' + dynamicClass + pointerClass + activeClass + expandedClass} 
			onClick = {rowClickHandler}
		>
			<div className={'topRow'}>
				
				<span className = 'expandButton' onClick={expandHandler}>
					{expandIcon}
				</span>
				
				{rowContent}
			</div>
			
			{expanded ? <div 
				style={{height:'200px'}}
				className = 'componentWrapper'
			>
				<props.nestedComponent {...props.nestedProps}/>
			</div> : null}
			
		</div>
	)
}