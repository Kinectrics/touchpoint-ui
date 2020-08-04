import React from 'react'
import CheckButton from './CheckButton'
import produce from 'immer'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faColumns} from '@fortawesome/free-solid-svg-icons'
import MenuButton from '../MenuButton'

export default function ColumnSettings(props) {

	function clickHandler(checked, idx){
		props.setTransitionClass('noTransition')
		let reFilter = false
		
		props.headers.set(
			produce(props.headers.get(), (draftHeaders) => {
				draftHeaders[idx].visible = checked
				
				if (!checked && draftHeaders[idx].hasFilter()){
					draftHeaders[idx].clearFilter()
					reFilter = true
				}	
			})
		)
		
		setTimeout(()=>{
			if(reFilter){props.data.filter()}
			props.setTransitionClass('')
		},0)
	}
	
	return (<MenuButton 
			locked={false} 
			menuContent={
				<div style = {{overflowY: 'auto'}}>
					{props.headers.get().map((h) => {
						return (
							<CheckButton
								key={'customizeHeader' + h.headerID}
								disabled={h.required}
								checked={h.visible}
								value={h.index}
								onClick={clickHandler}
							>{h.displayName}</CheckButton>
						)
					})}
				</div>
			}>
			<FontAwesomeIcon icon={faColumns} /> Column Settings
	</MenuButton>
		
	)
}