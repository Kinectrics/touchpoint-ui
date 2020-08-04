import {useState} from 'react'
import produce from 'immer'
import DataHeader  from '../DataObjects/DataHeader'
import {v4 as uuid} from 'uuid'


//Crates a set of DataHeaders, for use with a mainTable
export default function useHeaders(dataHeaders = []) {
	
	function normalize(headerArray){
		let totalWidth = 0
		headerArray.forEach((hdr)=>{
			if(hdr.visible){totalWidth = totalWidth + hdr.width}
		})
		
		return headerArray.map((hdr, i)=>{
			hdr.width = 99 * (hdr.width / totalWidth)
			hdr.index = i
			return hdr
		})
	}
	
	const [headers, setHeaders] = useState(normalize(dataHeaders.map((hdr) => {
		return (new DataHeader(hdr))
	})))
	
	const [savedLayouts, setSavedLayouts] = useState({})
	
	
	//Coverts the current layout to JSON and saves it
	function saveLayout(layoutName){
		const newLayouts = {...savedLayouts}
		
		const saveID = uuid()
		
		newLayouts[saveID] = {
			name: layoutName,
			headerOptions: {}
		}
		
		headers.forEach((h)=>{
			newLayouts[saveID].headerOptions[h.headerID] = {
				visible: h.visible,
				
				filterList: Object.values(h.filterList).map((f)=>{
					if(f.options){return f.options}
				})
			}
		})
		
		setSavedLayouts(newLayouts)
	}
	
	function loadLayout(id){
		if(savedLayouts[id]){
			console.log(savedLayouts[id])
		}
	}
	
	
	//Saves a list of unique values in each column (header) - to be used in the filter dropdowns
	function embedData(data, metaData) {
		//using Immer to edit the header state while keeping it immutable
		setHeaders(produce(headers, (draft) => {
			draft.map((hdr) => {
				hdr.embedData(data, metaData)
			})
		}))
	}
	
	function applyToken(token){
		const newSettings = JSON.parse(token)
		setSavedLayouts(newSettings.savedLayouts)
	}
	

	return ({
		get: () => {return headers},
		set: (val) => {setHeaders(normalize(val))},
		embedData: embedData,
		applyToken: applyToken,
		saveLayout: saveLayout,
		loadLayout: loadLayout,
		getSavedLayouts: ()=>{return savedLayouts}
	})
}