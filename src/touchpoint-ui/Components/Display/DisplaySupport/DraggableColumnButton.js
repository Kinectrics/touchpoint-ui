import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import CheckButton from './CheckButton'

export default function DraggableColumnButton(props) {
	return (
		<Draggable draggableId={props.h.headerID} index={props.h.index}>
			
			{(provided, snapshot) => (
				<div
					className='dragWrapper'
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
				>
					<div style={{
						transform: snapshot.isDragging ? 'translateY(-100px)' : '',
						overflow: 'visible'
					}}>
						<CheckButton
							disabled={props.h.required}
							checked={props.h.visible}
							value={props.h.index}
							onClick={props.clickHandler}
						>{props.h.displayName}</CheckButton>
					</div>
				</div>
			)}
			
		</Draggable>
		
	)
}
