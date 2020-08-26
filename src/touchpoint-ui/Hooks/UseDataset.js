import {useState, useEffect} from 'react'
import useModuleData from '../Hooks/UseModuleData'


//Initialises a Dataset and caches the value
export default function useDataset(fetchFunction, options = {}) {
	
	//The array contains an empty object by default
	const [data, setData] = useState(options.defaultValue ? options.defaultValue : [])
	const [metaData, setMetaData] = useState([{visible: true, filteredBy: ''}])
	const [status, setStatus] = useState('Pending')
	const [lastResolved, setLastResolved] = useState()
	const [lastEdited, setLastEdited] = useState()
	const [headers, setHeaders] = useState({ get: () => [] , getSortRules: ()=>[] })
	const [activeRecord, setActiveRecord] = useState({})
	
	//Allowing you to choose the data arary you use, so you can set the active row right after fetching/setting new data
	function selectRecord(newPrimaryKey, fromData = data){

		const newIndex = fromData.findIndex(r => r[options.primaryKey] == newPrimaryKey)
		
		if(newIndex > -1){
			setActiveRecord(fromData[newIndex])
			return (fromData[newIndex])
		} else{
			setActiveRecord({})
			return({})
		} 	
	}
	
	
	function getActiveRecord(){
		return activeRecord
	}
	
	
	//Search data a and generate new metadata
	const searchText = useModuleData().get('TouchPointSearchText')
	
	function searchData(values) {

		const newMetaData = []
		
		values.forEach((r, idx) => {

			const rowMeta = metaData[idx] ? metaData[idx] : {}
			rowMeta.searchHidden = false

			if (searchText) {

				const testVal = JSON.stringify(r).toLowerCase()
				rowMeta.searchHidden = !testVal.includes(searchText.toLowerCase())
				
			}
			
			newMetaData.push(rowMeta)
		})
		
		return newMetaData
	}
	
	
	useEffect(() => {
		setMetaData(searchData(data))
	}, [searchText])
	
	//Filters the data based on given headers
	function filterData(values){
		
		const newMetaData = []
		
		values.forEach((r, idx) => {
			
			const rowMeta = metaData[idx] ? metaData[idx] : {}
			rowMeta.filteredBy = ''
			
			let noRender = false
			
			headers.get().forEach((h) => {
				const fltr = h.filter(r[h.headerID], r)
				
				if (!fltr && fltr !='arrayFilter' && h.visible){
					noRender = true
					rowMeta.filteredBy = rowMeta.filteredBy + [h.headerID] + ';'
				}
			})

			rowMeta.visible = !noRender 
			newMetaData.push(rowMeta)
		})
		
		return newMetaData
	}
	
	
	function sortData(values){
		let newValues = [...values]
		
		headers.getSortRules().forEach((sr)=>{
			
			if (headers.get()[sr.index] && headers.get()[sr.index].visible){
				newValues = newValues.sort((aRow, bRow) => {
					
					if (sr.direction === 'asc') {
						
						if(aRow[sr.headerID] > bRow[sr.headerID]){ 
							return 1
						}else if (aRow[sr.headerID] < bRow[sr.headerID]){
							return -1
						}
						
						return 0
						
					} else {
						if (aRow[sr.headerID] < bRow[sr.headerID]) {
							return 1
						} else if (aRow[sr.headerID] > bRow[sr.headerID]) {
							return -1
						}

						return 0
					}
					
				})
			}
			
		})
		
		return newValues
	}
	
	
	//Fetch data and update state once the operation is complete. Keep the old value in the meantime
	async function fetchData() {
		setStatus('Pending')

		try {
			
			const newData = sortData(await fetchFunction())
			
			setMetaData(searchData(newData))
			setMetaData(filterData(newData))
			setData(newData)
			
			selectRecord(activeRecord[options.primaryKey], newData)
			
			setStatus('Resolved')
			setLastResolved(Date())
			return status
			
		} catch (e) {
			setStatus('Rejected')
			console.error(e)
			return status
		}
	}
	
	//If it's a subdataset, forward the refresh request to the parent
	async function refreshData(){
		if (status !== 'Pending') {
			fetchData()
		}
	}
	
	//Automatically run the fetching function the first time, then wait for a refresh
	//If the dataset was spawned by a parent dataset, send its refresh function to the parent, so it can refresh when the parent refreshes
	useEffect(()=>{ 
		fetchData()
	},[])
	
	//Return a Dataset object
	return ({
		read: () => { return data },
		refresh: refreshData,
		
		selectRecord: (newKey) => selectRecord(newKey),
		getActiveRecord: getActiveRecord,
		
		status: status,
		lastResolved: lastResolved,
		lastEdited: lastEdited,
		
		//TouchPoint Controls
		setHeaders: setHeaders,
		isDataset: true,
		primaryKey: options.primaryKey,
		getMetaData: () => { return metaData },
		
		filter: () => {
			const newMeta = filterData(data)
			setMetaData(newMeta)
			headers.embedData(data, newMeta)
		},
		
		sort: () => {
			
			const newData = sortData(data)
			const newMeta = filterData(newData)
			
			setMetaData(newMeta)
			setData(newData)
		},
		
		set: (newData)=>{
			setData(newData)
			setLastEdited(Date())
			selectRecord(activeRecord[options.primaryKey], newData)
		}
	})
}