import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'

export default function PageContols(props) {
	
	function pageBack() {
		if (props.activePage > 0) {
			props.setActivePage(props.activePage - 1)
		}
		i = 1
	}
	
	
	//Buttons for page controls
	function BackButton() {
		if (props.activePage > 0) {
			return (
				<button
					onClick={pageBack}
				>
					<FontAwesomeIcon icon={faCaretLeft} />
				</button>
			)
		} else return null
	}
	
	
	function pageForward() {
		if (props.activePage < Math.floor(props.dataLength / props.pageSize) - 1) {
			props.setActivePage(props.activePage + 1)
		}
		i = 1
	}


	function ForwardButton() {
		if (props.activePage < Math.floor(props.dataLength / props.pageSize) - 1) {
			return (
				<button
					onClick={pageForward}
				><FontAwesomeIcon icon={faCaretRight} /></button>
			)
		} else return null
	}
	


	if (props.dataLength > props.pageSize) {
		return (<div className="pageControls">
			<BackButton />

			<button className='textButton'>Showing {1 + props.activePage * props.pageSize}-
			{Math.min((1 + props.activePage) * props.pageSize, props.dataLength) + ' '}
			of {`  ${props.dataLength}`}</button>

			<ForwardButton />
		</div>)
	} else return null
	
}
