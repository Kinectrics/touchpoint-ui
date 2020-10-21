import React, {useState, useRef, useEffect} from 'react'
import './CoreTable.css'
import TheadButton from './TheadButton' 
import TableControls from './TableControls'
import useSettings from '../../../Hooks/UseSettings'
import PageControls from './PageContols'
import TableBody from './TableBody'
import lockedContext from '../../../Contexts/LockedContext'

export default function CoreTable(props){
	
	//Sorting and filtering are optional (via props), only supported with if a dataset is provided
	const {noSort, noFilter, noActive, locked} = props
	const noOptions = props.noOptions || !props.settingsID
	
	//expanded rows (if applicable)
	const hasNestedClass = props.nestedComponent ? ' hasNested ' : null
	
	//support for dataSets or for just arrays
	const data = props.data.read()
	const metaData = props.metaData
	
	//Settings token support 
	const saveSettings = useSettings(props.settingsID, (token) => {
		props.headers.applyToken(token)
		props.data.setLastResolved(new Date().toISOString()) //Sort trigger to make it sort on the next render using the below useEffect
	})
	
	//Active page handling
	const [activePage, setActivePage] = useState(0)
	
	//When you search, return to page 0 in case the search results don't reach the current page
	useEffect(()=>{
		setActivePage(0)
	}, [props.searchText])
	
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
		props.data.setLastEdited(new Date().toISOString())
		if (props.searchText) { props.data.search() }
	}, [props.data.lastResolved])
	
	useEffect(() => { 
		//Filtering a second time when data is refreshed. This is required because otherwise the wrong rows appear on screen if you refresh while a filter is on 
		props.data.filter()
	}, [props.data.lastEdited])
	
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

	//Positioning for nested components
	const tableRef = useRef()
	const [expandedRows, setExpandedRows] = useState({})

	//Render
	return (
		<lockedContext.Provider value={props.locked}>
			<div 
				className={'MainTable ' + hasActiveClass + hasNestedClass} 
				ref = {tableRef} 
				style={props.style}
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
							showExpandControls = {props.nestedComponent ? true : false}
							expandedRows={expandedRows}
							setExpandedRows={setExpandedRows}
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
					width: 'max(calc(' + totalHeaderWidth + 'px + 70px), 100%)'
				}}>
					{props.headers.get().map((hdr, i) => {
						if (hdr.visible || hdr.required) {
							//Custom component type headers have no filters
							if (hdr.component) return <span style={{ width: hdr.width + 'px' }} key={'header' + i} className='theadBarComponentWrapper'>
								{hdr.displayName + ' '}
							</span>
							
							let headerClass = hdr.onEdit ? ' theadBarTheadButtonWrapper ' : ' shiftLeft theadBarTheadButtonWrapper '
							if(hdr.styling && (!hdr.styling.textAlign)){
								headerClass = headerClass + ' centeredHeader '
							}
							
							return (
								<span 
									style={{ width: hdr.width + 'px' }} 
									key={'header' + i} 
									className={headerClass}
								>

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
				
				
				<div className={"mainSection"} style={{
					width: 'max(calc(' + totalHeaderWidth + 'px + 70px), 100%)' 
				}}>
					<TableBody
						searchable={props.searchable}
						data={props.data}
						dataHeaders={props.headers.get()}
						locked={locked}
						dynamic={dynamic}
						nestedComponent={props.nestedComponent}
						nestedProps={props.nestedProps}
						noActive={noActive}
						tableRef={tableRef}
						pageSize={props.pageSize}
						activePage={activePage}
						metaData={metaData}
						dataArray = {data}
						noLoading = {props.noLoading}
						expandedRows={expandedRows}
						setExpandedRows={setExpandedRows}
					/>
				</div>
			</div>
		</lockedContext.Provider>
	)
}