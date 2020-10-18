import {useState, useRef} from 'react'
import DataHeader  from '../DataObjects/DataHeader'
import {v4 as uuid} from 'uuid'


//Crates a set of DataHeaders, for use with a mainTable
export default function useHeaders(dataHeaders = []) {
	
	const [headers, setHeaders] = useState(dataHeaders.map((hdr, i) => {
		const obj = new DataHeader(hdr)
		obj.index = i
		return (obj)
	}))
	
	const [savedLayouts, setSavedLayouts] = useState({})
	const [settingsEngine, setSettingsEngine] = useState({ save: ()=>{} })
	const [tokenTrigger, setTokenTrigger] = useState(false)
	
	const sortRules = useRef([])
	const setSortRules = (value) => {sortRules.current = value}
	
	//Coverts the current layout to JSON and saves it
	function saveLayout(layoutName){
		const newLayouts = {...savedLayouts}
		const saveID = uuid()
		
		newLayouts[saveID] = {
			name: layoutName,
			headerOptions: {},
			sortRules: sortRules.current
		}
		
		
		headers.forEach((h)=>{
			newLayouts[saveID].headerOptions[h.headerID] = {
				visible: h.visible,
				filterList: []
			}
			
			Object.values(h.filterList).forEach((f) => {
				if (f.options) { newLayouts[saveID].headerOptions[h.headerID].filterList.push( f.options )}
			})
		})
		
		setSavedLayouts(newLayouts)
		setTokenTrigger(true)
	}
	
	function loadLayout(id){
		if(savedLayouts[id]){
			
			const newHeaders = []
			
			headers.forEach(h=>{
				try{
					h.clearFilter()
					
					//If there's no setting for this header it means it was added in an update. Hide it since its not selected. If its requried, it will show anyway. 
					h.visible = savedLayouts[id].headerOptions && savedLayouts[id].headerOptions[h.headerID] ?
					savedLayouts[id].headerOptions[h.headerID].visible :
					false

					savedLayouts[id].headerOptions[h.headerID].filterList.forEach((f) => {
						h.addFilter(f)
					})
					
				}catch(err){
					console.error(err)
				}
				
				newHeaders.push(h)
			})
				
			setHeaders(newHeaders)
			setSortRules(savedLayouts[id].sortRules)
			setTokenTrigger(true)
		}
	}
	
	function deleteLayout(id){
		const newLayouts = {...savedLayouts}
		delete newLayouts[id]
		setSavedLayouts(newLayouts)
		setTokenTrigger(true)
	}
	
	
	//Saves a list of unique values in each column (header) - to be used in the filter dropdowns
	function embedData(data, metaData) {
		
		const newHeaders = [...headers]
		
		newHeaders.forEach((hdr) => {
			hdr.embedData(data, metaData)
		})

		setHeaders(newHeaders)
	}
	
	function applyToken(token){
		try{
			const newSettings = JSON.parse(token)
			setSavedLayouts(newSettings.savedLayouts)

			const newHeaders = [...headers]

			newHeaders.forEach((h) => {
				h.visible = newSettings.headerOptions && newSettings.headerOptions && newSettings.headerOptions[h.headerID] ? 
				newSettings.headerOptions[h.headerID].visible : true
			})

			setSortRules(newSettings.sortRules ? newSettings.sortRules : [])
			setHeaders(newHeaders)
		} catch(err){
			console.error(err)
		}
		
	}
	
	function setVisible(index, bool){
		const newHeaders = [...headers]
		newHeaders[index].visible = bool
		setHeaders(newHeaders)
		setSortRules( [...sortRules.current].filter(sr => sr.headerID !== headers[index].headerID) )
		setTokenTrigger(true)
	}
	
	//If settings have changed since the last render, create and save a new token
	if (tokenTrigger) {
		setTokenTrigger(false)
		
		const res = {
			savedLayouts: savedLayouts,
			headerOptions: {},
			sortRules: sortRules.current
		}
		
		headers.forEach((hdr)=>{
			res.headerOptions[hdr.headerID] = {
				visible: hdr.visible,
			}
		})

		settingsEngine.save(JSON.stringify(res))
	}
		
	function removeSortRule(headerID){
		setSortRules(
			[...sortRules.current].filter(sr => sr.headerID !== headerID)
		)
		setTokenTrigger(true)
	}
	
	function addSortRule(headerID, direction, headerIndex){
		const newSortRules = [...sortRules.current].filter(sr => sr.headerID !== headerID)
		newSortRules.push({headerID: headerID, direction: direction, index: headerIndex})
		setSortRules(newSortRules)
		setTokenTrigger(true)
	}

	return ({
		get: () => {return headers},
		set: setHeaders,
		
		embedData: embedData,
		applyToken: applyToken,
		saveLayout: saveLayout,
		loadLayout: loadLayout,
		deleteLayout: deleteLayout,
		getSavedLayouts: ()=>{return savedLayouts},
		setSettingsEngine: setSettingsEngine,
		setVisible: setVisible,
		
		addSortRule: addSortRule,
		removeSortRule: removeSortRule,
		getSortRules: ()=>{
			return sortRules.current
		}
	})
}