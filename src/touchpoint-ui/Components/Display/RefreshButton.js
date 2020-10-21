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
	
	return (
		<CoreButton title={props.title} style={props.style} className={props.className} onClick={() => {
			props.data.refresh()
		}}>
			{props.icon ? props.icon : <FontAwesomeIcon icon={faSyncAlt} />} 
			{props.title ? props.title : ' Refresh'}
		</CoreButton>
	)
}

RefreshButton.propTypes={
	className: propTypes.string,
	style: propTypes.object,
	data: propTypes.object.isRequired,
	icon: propTypes.object,
	title: propTypes.string,
}