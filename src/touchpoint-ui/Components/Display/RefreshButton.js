import React from 'react'
import CoreButton from '../Inputs/CoreButton'
import Loading from './Loading'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faSyncAlt} from "@fortawesome/free-solid-svg-icons"
import propTypes from 'prop-types'

export default function RefreshButton(props) {
	
	if(props.data.status === 'Pending'){
		return <CoreButton style = {props.style} className={props.className} title={props.title}>
			<Loading style={{
				fontSize: 'inherit',
				opacity: '100%'
			}}>
				{props.icon ? props.icon : <FontAwesomeIcon icon={faSyncAlt} />} 
			</Loading> 
			{props.title ? props.title : ' Refresh'}
		</CoreButton>
	}
	
	function clickHandler(){
		if(Array.isArray(props.data)){
			props.data.map(d=>d.refresh())
		}else{
			props.data.refresh()
		}
		
	}
	
	return (
		<CoreButton title={props.title} style={props.style} className={props.className} onClick={clickHandler} locked={props.locked} hidden = {props.hidden}>
			{props.icon ? props.icon : <FontAwesomeIcon icon={faSyncAlt} />} 
			{props.title ? props.title : ' Refresh'}
		</CoreButton>
	)
}

RefreshButton.propTypes={
	className: propTypes.string,
	style: propTypes.object,
	data: propTypes.oneOfType([propTypes.object, propTypes.array]).isRequired,
	icon: propTypes.object,
	title: propTypes.string,
}