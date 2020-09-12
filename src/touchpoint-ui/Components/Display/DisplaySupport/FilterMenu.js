import React from 'react'
import './SortMenu'


export default function FilterMenu(props){

	const values = props.header.uniqueValues
	
	function clickHandler(e, id){
		const cb = document.getElementById(id)
		if(e.target !== cb){cb.checked = !cb.checked}
		
		const newHeaders = [...props.dataHeaders.get()]
		newHeaders[props.header.index].uniqueValues[cb.value] = cb.checked
		props.dataHeaders.set(newHeaders)
	}
	
	function selectAll(e){
		const cb = document.getElementById(props.header.headerID + 'selectAll')
		if (e.target !== cb) { cb.checked = !cb.checked }
		
		const newHeaders = [...props.dataHeaders.get()]
		
		if(cb.checked){
			newHeaders[props.header.index].clearFilter()
		} else{
			newHeaders[props.header.index].selectAll(cb.checked)
		}
		
		props.dataHeaders.set(newHeaders)
	}
	
	const spanStyle = {
		textAlign: 'left',
		paddingLeft: '7px',
	}
	
	let count = -1
	const lim = 200
	
	if(!props.noFilter){ return (
		<div className = 'FilterMenu'>
			
			<div className='stickyMenu'>
				
				<button onClick={selectAll} className = 'selectAll fullButton compactText'>
			
					<input
						type='checkbox'
						checked={!props.header.hasFilter()}
						id={props.header.headerID + 'selectAll'}
						style={{ cursor: 'pointer' }}
						readOnly
					/>
					<span style={spanStyle}>{'Select All'}</span>

				</button>
			</div>
			
			{Object.keys(values).map((v, i) => {
				count++
				
				//Limit the number of checkboxes that are rendered to 200
				if(count < lim){return (<button
					className = {'fullButton compactText'}
					key={props.header.id + 'fv' + count}
					onClick={(e) => clickHandler(e, props.header.headerID + 'fcb' + i)}
					title = {props.header.format(v)}
				>
					
					<input 
						type = 'checkbox'
						checked = {values[v]}
						id={props.header.headerID + 'fcb' + i}
						value = {v}
						style= {{cursor:'pointer'}}
						readOnly
					/>
					<span 
						style={spanStyle}
					>
						{v !== 0 && !v ? 'Blank' : props.header.format(v)}
					</span>
					
				</button>)} else return null
				
			})}
			
			{count >= lim ? <button>... {count - lim} More</button> : null}
				

		</div>
	)} else return null
}