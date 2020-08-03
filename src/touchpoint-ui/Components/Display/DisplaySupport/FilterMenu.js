import React, { useState } from 'react'
import produce from 'immer'
import './FilterMenu.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import MoreFilters from './MoreFilters'

export default function FilterMenu(props){

	const values = props.header.uniqueValues
	
	function clickHandler(e, id){
		const cb = document.getElementById(id)
		if(e.target !== cb){cb.checked = !cb.checked}
		
		//using immer to modify the dataHeaders state without breaking immutability rules
		props.dataHeaders.set(
			produce(props.dataHeaders.get(), (draftHeaders)=>{
				draftHeaders[props.header.index].uniqueValues[cb.value] = cb.checked
			})
		)
		
		props.data.filter()
	}
	
	function selectAll(e){
		const cb = document.getElementById(props.header.headerID + 'selectAll')
		if (e.target !== cb) { cb.checked = !cb.checked }
		
		//using immer to modify the dataHeaders state without breaking immutability rules
		props.dataHeaders.set(
			produce(props.dataHeaders.get(), (draftHeaders) => {
				draftHeaders[props.header.index].selectAll(cb.checked)
			})
		)
		
		props.data.filter()
	}
	
	const spanStyle = {
		textAlign: 'left',
		paddingLeft: '7px',
	}
	
	const moreFilterIcon = props.expanded ? faCaretLeft : faCaretRight
	
	const sideMenu = props.expanded ? <div className='sideMenu'>
		<MoreFilters 
			header = {props.header}
			dataHeaders = {props.dataHeaders}
			data={props.data}
		/>
	</div> : null
	
	
	function toggleMenu(){
		props.setExpanded(!props.expanded)
	}
	
	
	return (
		<div className = 'FilterMenu'>
			<div 
				className = 'mainMenu' 
				style={{ borderRight: props.expanded ? '1px solid lightgray' : null}}
			>
				<div className = 'topMenu'>
					<button onClick={toggleMenu}>
						More Filters 
						<span className = 'subMenuIcon'>
							<FontAwesomeIcon icon={moreFilterIcon} />
						</span>
					</button>
					
					<button onClick={selectAll} className = 'selectAll'>
				
						<input
							type='checkbox'
							defaultChecked={!props.header.hasFilter()}
							id={props.header.headerID + 'selectAll'}
							style={{ cursor: 'pointer' }}
						/>
						<span style={spanStyle}>{'Select All'}</span>

					</button>
				</div>
				
				<div className="filterOptions">
					
					{Object.keys(values).map((v, i) => {
						return (<button
							key={props.header.id + 'fv' + i}
							onClick={(e) => clickHandler(e, props.header.headerID + 'fcb' + i)}
						>
							
							<input 
								type = 'checkbox'
								defaultChecked = {values[v]}
								id={props.header.headerID + 'fcb' + i}
								value = {v}
								style= {{cursor:'pointer'}}
							/>
							<span style={spanStyle}>{v !== 0 && !v ? 'Blank' : v}</span>
							
						</button>)
					})}
				</div>
			</div>
			
			{sideMenu}
			
		</div>
	)
}