import React, {useState, useContext, useEffect} from 'react'
import PropTypes from 'prop-types'
import './MainTable.css'
import MainTableRow from './DisplaySupport/MainTableRow'
import lockedContext from '../../Contexts/LockedContext'
import TheadButton from './DisplaySupport/TheadButton' 
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCaretLeft, faCaretRight} from '@fortawesome/free-solid-svg-icons'
import TableControls from './DisplaySupport/TableControls'
import useSettings from '../../Hooks/UseSettings'

export default function MainTable(props){
	
	//Sorting and filtering are optional (via props), only supported with if a dataset is provided
	let noSort = props.noSort || !props.data.sort  
	let noFilter = props.noFilter
	let noOptions = props.noOptions || !props.settingsID
	let searchable = props.searchable
	
	//support for dataSets or for just arrays
	let data = props.data
	let metaData = [{}]
	
	if(props.data.isDataset){
		data = props.data.read()
		metaData = props.data.getMetaData()
	} else{
		noSort = true
		noFilter = true
		searchable =  false
	}
	
	//Settings token support 
	const [sortTrigger, setSortTrigger] = useState(false)
	const saveSettings = useSettings(props.settingsID, (token) => {
		props.headers.applyToken(token)
		if(!noSort){setSortTrigger(true)}
	})
	
	if (sortTrigger) { 
		setSortTrigger(false)
		setTimeout(props.data.sort, 0)
	}
	
	//For dataSets - runs when dataSet refreshes (sets the filter options to match)
	useEffect(()=>{
		
		if(!noFilter){
			props.headers.embedData(data, metaData)
			props.data.setHeaders(props.headers)
		}
		
		if(!noOptions){
			props.headers.setSettingsEngine({save: saveSettings})
		}
		
	}, [props.data.lastResolved])
	
	//Active page handling
	const [activePage, setActivePage] = useState(0)
	
	//get the length of the data with the filter applied
	let dataLength = 0
	data.forEach((r, idx)=>{
		if(metaData[idx]){
			if (metaData[idx].visible && !metaData[idx].searchHidden){dataLength ++}
		} else {
			dataLength++
		}
	})
	
	//if there's no way to set the active record, then no record is active
	let activeRecord
	if(props.activeRecord && props.setActiveRecord){activeRecord = props.activeRecord}
	
	//default page Size
	let pageSize = props.pageSize
	if(!pageSize){ pageSize = 500}
	
	//deccides if the component is locked based on props and parents in the tree
	const lockedFromAbove = useContext(lockedContext)
	const locked = props.locked || (lockedFromAbove && props.locked === undefined)
	
	//If clicking sets the active record then its animated
	//if there are editable cells the animations will be cancelled
	let dynamic
	let hasActiveClass = ''
	if(props.setActiveRecord){
		dynamic = true
		hasActiveClass = ' hasActive '
	} 
	
	let hasFilter = false
	let totalHeaderWidth = 70
	
	props.headers.get().forEach(hdr => {
		//if you have input cells in the table, hover effects will be cancelled
		if(hdr.onEdit){dynamic = false}
		
		if(hdr.visible){totalHeaderWidth = totalHeaderWidth + hdr.width}
		
		//check if any headers have active filters (to show a clear filter button)
		if(hdr.hasFilter()){hasFilter = true}

	})
	
	//Counter for rendered rows
	let i = 1
	
	//Buttons for page controls
	function pageForward(){
		if (activePage < Math.floor(dataLength/pageSize)-1){
			setActivePage(activePage + 1)
		}
		i = 1
	}
	
	function BackButton(){ 
		if(activePage > 0){return(
			<button
				onClick={pageBack}
			>
				<FontAwesomeIcon icon = {faCaretLeft}/>
			</button>
		)} else return null
	}
	
	function pageBack(){
		if (activePage > 0){
			setActivePage(activePage - 1)
		}
		i = 1
	}
	
	function ForwardButton(){ 
		if(activePage < Math.floor(dataLength/pageSize) - 1){return(
			<button
				onClick={pageForward}
			><FontAwesomeIcon icon = {faCaretRight}/></button>
		)} else return null
	}
	
	function clearFilter(){
		const newHeaders = [...props.headers.get()]
		newHeaders.forEach(hdr=>{
			hdr.clearFilter()
		})
		
		props.headers.set(newHeaders)
		props.data.filter()
	}
	
	function PageControls(){
		if(dataLength > pageSize){
			return( <div className="pageControls">
				<BackButton/>
				
				<button className='textButton'>Showing {1+activePage*pageSize}-
				{Math.min((1+activePage)*pageSize, dataLength) +' '}
				of {`  ${dataLength}`}</button>  
				
				<ForwardButton/>
			</div>)
		} else return null
	}
	
	const [transitionClass, setTransitionClass] = useState('')
	
	//Render
	return (
		<div className={'MainTable ' + hasActiveClass}>

			<div className="topBar">
				<TableControls
					hasFilter={hasFilter}
					noFilter={noFilter}
					noSort={noSort}
					clearFilter={clearFilter}
					noOptions={noOptions}
					dataHeaders={props.headers}
					data={props.data}
					setTransitionClass={setTransitionClass}
				/>
				<PageControls />
			</div>


			<div className="theadBar" style={{
				top: 'var(--topBarHeight)',
				width: 'max(calc(' + totalHeaderWidth + 'px + 70px), 100%)'
			}}>
				{props.headers.get().map((hdr, i) => {
					if (hdr.visible) {
						return (
							<span style={{ width: hdr.width + 'px' }} key={'header' + i}>

								<TheadButton
									header={hdr}
									data={props.data}
									dataHeaders={props.headers}
									noFilter={noFilter} 
									noSort={noSort}
								>
									{hdr.displayName + ' '}
								</TheadButton>

							</span>
						)
					} else return null
				})}
			</div>
			
			
			<div className={"mainSection" + transitionClass} style={{
				width: 'max(calc(' + totalHeaderWidth + 'px + 70px), 100%)' 
			}}>
				
				{/* Table body data */}
				<div className = {'tableBody ' + props.data.lastResolved}>
					{data.map((dr, idx) => {
						//render the allowed numebr of rows, on th selected page
						if((i > activePage * pageSize) && (i <= (1 + activePage)*pageSize)){
							
							let renderRow = dr !== []
							
							if(searchable){
								renderRow = !metaData[idx].searchHidden
							}
							

							renderRow = renderRow && (noFilter || metaData[idx].visible)
							
							const r = renderRow ? 
								<MainTableRow
									dataRow = {dr}
									dataHeaders={props.headers.get()}
									setActiveRecord = {props.setActiveRecord}
									activeRecord = {activeRecord}
									rowKey = {'MainTableRow'+i}
									key = {'MainTableRow'+i}
									locked = {locked}
									dynamic = {dynamic}
								/> : null
							
							if(r){i++}//Count the number of rows actually renedered (not filtered out)
							
							return r
						} else if(i <= (1 + activePage)*pageSize){i++}
						
						return null
					})}
				</div>
			</div>
		</div>
	)
}


//Proptypes
MainTable.propTypes = {
	setActiveRecord: PropTypes.func,
	onEdit: PropTypes.func,
	headers: PropTypes.object.isRequired,
	
	data: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.array
	]).isRequired,
	
	pageSize: PropTypes.number,
	locked: PropTypes.bool,
	searchable: PropTypes.bool,
	noSort: PropTypes.bool,
	noFilter: PropTypes.bool,
	noOptions: PropTypes.bool,
}