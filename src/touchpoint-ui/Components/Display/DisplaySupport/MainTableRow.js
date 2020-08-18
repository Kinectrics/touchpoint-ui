import React, {useEffect, useState} from 'react'
import './MainTableRow.css'
import InputCell from './InputCell'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

export default function MainTableRow(props) {
	
	const activeClass = props.dataset.getActiveRecord && props.dataset.getActiveRecord()[props.dataset.primaryKey] === props.dataRow[props.dataset.primaryKey]
	? ' active '
	:  ''
	
	function rowClickHandler(){
		if(!props.noActive){
			props.dataset.selectRecord( props.dataRow[props.dataset.primaryKey])
		}
	}
	
	const rowContent = props.dataHeaders.map((hdr, i) => {
		if(hdr.visible){
			
			//Decide if the cell is editable or not based on the locked status, and the header onEdit function
			let cellContent = props.dataRow[hdr.headerID]
			let cellClass = ''
			
			if(!props.locked && hdr.onEdit && !hdr.locked){
				cellContent = <InputCell 
					header = {hdr}
					dataRow = {props.dataRow}
					rowIndex = {props.rowIndex}
					dataset = {props.dataset}
				/>
				cellClass = 'inputWrapper'
			}
			
			
			if (!hdr.styling){ //No conditional formatting
				return(<span 
					key = {hdr.headerID + props.rowKey} 
					style = {{width: hdr.width + 'px'}}
					className = {cellClass}
				>
					{cellContent}
				</span>)
			
			} else{ //with coniditional formatting
				
				
				const myStyle = hdr.styling(props.dataRow[hdr.headerID], props.dataRow)
				
				return( 
					<span className = {'badge ' + cellClass}
					key = {hdr.headerID + props.rowKey + i} 
					style = {{
						width: 'calc(' + hdr.width + 'px - 23px)',
						...myStyle,
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
	
	function expandHandler(e){
		//don't set the active row when collapsing 
		if (expanded) { e.stopPropagation()}
		setExpanded(!expanded)
	}
	
	//Listeners to expand all and collapse all events from the parent maintable
	useEffect(()=>{
		setExpanded(true)
	},[props.expandTrigger])
	
	useEffect(() => {
		setExpanded(false)
	}, [props.collapseTrigger])
	
	//Allow nested components to update their dataRow
	function setDataRow(newRow){
		const newData = [...props.dataset.read()]
		newData[props.rowIndex] = newRow
		props.dataset.set(newData)
	}
	
	const expandIcon = props.nestedComponent ? <span className='expandButton' onClick={expandHandler}>
		{expanded ? <FontAwesomeIcon icon={faMinus} /> : <FontAwesomeIcon icon={faPlus} />}
	</span> : null
	
	return(
		<div
			className={'MainTableRow ' + activeClass + expandedClass} 
			onClick = {rowClickHandler}
		>
			<div className={'topRow'}>
				{expandIcon}
				{rowContent}
			</div>
			
			{expanded && props.nestedComponent ? <div 
				className = 'componentWrapper'
			>
				<div className="keepInView" style={{
					width: props.tableRef.current ? 'calc(' + props.tableRef.current.clientWidth + 'px - 35px)' : null,
					left: props.scrollPos
				}}>
					<props.nestedComponent
						{...props.nestedProps}
						dataRow = {props.dataRow}
						setDataRow = {setDataRow}
					/>
				</div>
				
			</div> : null}
			
		</div>
	)
}