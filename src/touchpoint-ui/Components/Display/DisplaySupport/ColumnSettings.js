import React from 'react'
import CheckButton from './CheckButton'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faColumns} from '@fortawesome/free-solid-svg-icons'
import MenuButton from '../MenuButton'

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
				maxHeight: '300px',
				maxWidth: '300px'
			}}
			onClose={applyHandler}
			menuContent={
				<div style={{ overflowY: 'auto', overflowX: 'hidden'}}>
					{props.headers.get().map((h) => {
						if(h.displayName){
							return (
								<CheckButton
									key={'customizeHeader' + h.headerID}
									disabled={h.required}
									checked={h.visible}
									value={h.index}
									onClick={clickHandler}
								>{h.displayName}</CheckButton>
							)
						}else return null
						
					})}
				</div>
			}>
			<FontAwesomeIcon icon={faColumns} /> Column Settings
	</MenuButton>
		
	)
}