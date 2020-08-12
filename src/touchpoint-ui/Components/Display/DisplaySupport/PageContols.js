import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'

export default function PageContols(props) {
	
	const showPageBack = props.activePage > 0
	const showPageForward = props.activePage < Math.floor(props.dataLength / props.pageSize) - 1
	
	
	function pageBack() {
		if (props.activePage > 0) {
			props.setActivePage(props.activePage - 1)
		}
	}
	
	
	function pageForward() {
		if (props.activePage < Math.floor(props.dataLength / props.pageSize) - 1) {
			props.setActivePage(props.activePage + 1)
		}
	}
	

	if (props.dataLength > props.pageSize) {
		return (<div className="pageControls">
			
			{showPageBack ? 
				<button onClick={pageBack}><FontAwesomeIcon icon={faCaretLeft} /></button> 
			: null}
			

			<button className='textButton'>Showing {1 + props.activePage * props.pageSize}-
			{Math.min((1 + props.activePage) * props.pageSize, props.dataLength) + ' '}
			of {`  ${props.dataLength}`}</button>
			

			{showPageForward ?
				<button onClick={pageForward}><FontAwesomeIcon icon={faCaretRight} /></button>
			:null}
			
		</div>
		
	)} else return null
	
}
