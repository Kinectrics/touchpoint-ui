import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faColumns} from '@fortawesome/free-solid-svg-icons'
import MenuButton from '../MenuButton'
import ColumnsDraggable from './ColumnsDraggable'

export default function ColumnSettings(props) {

	function clickHandler(checked, idx){
		props.headers.setVisible(idx, checked)
	}
	
	function applyHandler(){
		props.data.sort()
	}
	
	return (<MenuButton 
			locked={false} 
			menuStyle={{
				maxWidth: '300px',
				height: 'fit-content',
				maxHeight: 'fit-content',
				overflow: 'hidden'
			}}
			onClose={applyHandler}
			menuContent={
				<ColumnsDraggable
					headers={props.headers}
					clickHandler={clickHandler}
				/>
			}>
			<FontAwesomeIcon icon={faColumns} /> Column Settings
	</MenuButton>
		
	)
}