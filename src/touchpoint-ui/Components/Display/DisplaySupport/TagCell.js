import React from 'react'
import './TagCell.css'

export default function TagCell(props) {
	return (
		<span className='TagCell'>
			{props.row[props.header.headerID].map((tag,idx)=>{
				const tagStyle = props.header.styling ? props.header.styling(tag, props.row) : {}
				
				return <button className='tag' key={tag + idx} style = {tagStyle}>
					{tag}
				</button>
			})}
		</span>
	)
}
