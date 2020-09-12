import React, {useState, useContext, useEffect} from 'react'
import './CoreTable.css'
import MainTableRow from './MainTableRow'
import TheadButton from './TheadButton' 
import TableControls from './TableControls'
import useSettings from '../../../Hooks/UseSettings'
import PageControls from './PageContols'
import { useRef } from 'react'

export default function MainTable(props){
	
	//Sorting and filtering are optional (via props), only supported with if a dataset is provided
	const {noSort, noFilter, searchable, noActive, locked} = props
	const noOptions = props.noOptions || !props.settingsID
	
	//expanded rows (if applicable)
	const hasNestedClass = props.nestedComponent ? ' hasNested ' : null
	
	//support for dataSets or for just arrays
	const data = props.data.read()
	const metaData = props.metaData
	
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
	
	//For dataSets - runs when dataSet refreshes (sets the filter options to match)
	useEffect(() => {
		if (!noFilter) { props.headers.embedData(data, metaData) }
		if (!noOptions) { props.headers.setSettingsEngine({ save: saveSettings }) }
		
		props.data.sort()

	}, [props.data.lastResolved, props.data.lastEdited])
	
	//If clicking sets the active record then its animated
	//if there are editable cells the animations will be cancelled
	let dynamic
	let hasActiveClass = ''
	
	if(!noActive){
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

	function clearFilter(){
		const newHeaders = [...props.headers.get()]
		newHeaders.forEach(hdr=>{
			hdr.clearFilter()
		})
		
		props.headers.set(newHeaders)
		props.data.filter()
	}
	
	const [transitionClass, setTransitionClass] = useState('')
	
	//Counter for rendered rows
	let rowCount = 1

	//Positioning for nested components
	const [expandTrigger, setExpandTrigger] = useState(false)
	const [collapseTrigger, setCollapseTrigger] = useState(false)
	const tableRef = useRef()
	const [scrollPos, setScrollPos] = useState(0)


	function scrollHandler(e){
		if(e.target.scrollLeft !== scrollPos){
			setScrollPos(e.target.scrollLeft)
		}
	}

	//Render
	return (
		<div 
			className={'MainTable ' + hasActiveClass + hasNestedClass} 
			ref = {tableRef} 
			onScroll={hasNestedClass ? scrollHandler : undefined}
		>

			<div className="topBar">
				<div className='topBarContainer'></div>
					<TableControls
						hasFilter={hasFilter}
						noFilter={noFilter}
						noSort={noSort}
						clearFilter={clearFilter}
						noOptions={noOptions}
						dataHeaders={props.headers}
						data={props.data}
						setTransitionClass={setTransitionClass}
						setExpandTrigger = {setExpandTrigger}
						setCollapseTrigger = {setCollapseTrigger}
						expandTrigger = {expandTrigger}
						collapseTrigger = {collapseTrigger}
						showExpandControls = {props.nestedComponent ? true : false}
					/>
					<PageControls 
						activePage = {activePage}
						setActivePage = {setActivePage}
						dataLength = {dataLength}
						pageSize = {props.pageSize}
						tableRef={tableRef}
					/>
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
						if((rowCount > activePage * props.pageSize) && (rowCount <= (1 + activePage)*props.pageSize)){
							
							let renderRow = dr !== []
							
							if(searchable && metaData[idx]){
								renderRow = !metaData[idx].searchHidden
							}
							
							renderRow = renderRow && (noFilter || (metaData[idx] && metaData[idx].visible))
							
							const rowKey = dr[props.data.primaryKey] ? dr[props.data.primaryKey] : idx
							
							const r = renderRow ? 
								<MainTableRow
									dataRow = {dr}
									dataset = {props.data}
									dataHeaders={props.headers.get()}
									rowKey = {rowKey}
									key = {rowKey}
									locked = {locked}
									dynamic = {dynamic}
									rowIndex = {idx}
									nestedComponent = {props.nestedComponent}
									nestedProps = {props.nestedProps}
									expandTrigger = {expandTrigger}
									collapseTrigger = {collapseTrigger}
									noActive = {noActive}
									tableRef = {tableRef}
									scrollPos = {scrollPos}
								/> : null
							
							if(r){rowCount++}//Count the number of rows actually renedered (not filtered out)
							
							return r
						} else if(rowCount <= (1 + activePage)*props.pageSize){rowCount++}
						
						return null
					})}
				</div>
			</div>
		</div>
	)
}

MainTable.defaultProps = {
	pageSize: 100,
	
}