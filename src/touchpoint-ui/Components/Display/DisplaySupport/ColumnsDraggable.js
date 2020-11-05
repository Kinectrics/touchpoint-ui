import React from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import DraggableColumnButton from './DraggableColumnButton'
import './ColumnsDraggable.css'

export default function ColumnDraggable(props) {

	function onDragEnd(result) {
		if (!result.destination) { return }
		
		props.headers.setPosition(result.source.index, result.destination.index)
	}


	return (
		<div style={{height: 'fit-content', overflow: 'hidden' }} className='ColumnsDraggable'>
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId="columnSettings">
					{(provided, snapshot) => (
						<div
							{...provided.droppableProps}
							ref={provided.innerRef}
							style={{paddingBottom: snapshot.isDraggingOver ? '40px' : 0}}
						>
							{props.headers.get().map((h) => {
								if (h.displayName && !h.after) {
									return <DraggableColumnButton
										key={'customizeHeader' + h.headerID}
										h={h}
										clickHandler={props.clickHandler}
									/>
								} else return null
							})}
						</div>
					)}
				</Droppable>
			</DragDropContext>
		</div>
	)
}
