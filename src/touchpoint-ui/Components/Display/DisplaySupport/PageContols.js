import React, {useEffect} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'

export default function PageContols(props) {
	
	const showPageBack = props.activePage > 0
	const showPageForward = ((props.activePage + 1) * props.pageSize) < props.dataLength
	
	//If the data gets shorter than the active page then go back to page 1
	useEffect(() => {
		const lastRow = (props.activePage + 1) * props.pageSize
		const diff = props.dataLength - lastRow
		
		if(diff + props.pageSize < 0){
			props.setActivePage(0)
		}
	})
	
	if(!props.pageSize){
		return null
	}
	
	function pageBack() {
		if (showPageBack) {
			props.setActivePage(props.activePage - 1)
			props.tableRef.current.scrollTop = 0
		}
	}
	
	
	function pageForward() {
		if (showPageForward) {
			props.setActivePage(props.activePage + 1)
			props.tableRef.current.scrollTop = 0
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
