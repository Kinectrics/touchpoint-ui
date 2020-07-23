import React from 'react'
import produce from 'immer'
import './FilterMenu.css'

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
	
	return (
		<div className = 'FilterMenu'>
			
			<div className = 'topMenu'>
				{props.children}
			
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
	)
}