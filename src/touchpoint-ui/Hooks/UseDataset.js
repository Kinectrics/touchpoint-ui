import {useState, useEffect} from 'react'
import useModuleData from '../Hooks/UseModuleData'


//Initialises a Dataset and caches the value
export default function useDataset(fetchFunction, primaryKey, defaultValue = [{}]) {
	
	//The array contains an empty object by default
	const [data, setData] = useState(defaultValue)
	const [metaData, setMetaData] = useState([{visible: true, filteredBy: ''}])
	const [status, setStatus] = useState('Pending')
	const [lastResolved, setLastResolved] = useState()
	const [lastEdited, setLastEdited] = useState()
	const [headers, setHeaders] = useState({ get: () => [] , getSortRules: ()=>[] })
	const [activeRecord, setActiveRecord] = useState({})
	
	//Allowing you to choose the data arary you use, so you can set the active row right after fetching/setting new data
	function selectRecord(newPrimaryKey, fromData = data){

		const newIndex = fromData.findIndex(r => r[primaryKey] == newPrimaryKey)
		
		if(newIndex > -1){
			setActiveRecord(fromData[newIndex])
			return (fromData[newIndex])
		} else{
			setActiveRecord({})
			return({})
		} 	
	}
	
	
	function getActiveRecord(){
		//Ensure the row is valid and has the correct primary key
		return activeRecord
	}
	
	
	//Search data on change
	const searchText = useModuleData().get('TouchPointSearchText')
	
	function searchData(values) {

		const newMetaData = []
		
		values.forEach((r, idx) => {

			const rowMeta = metaData[idx] ? metaData[idx] : {}
			rowMeta.searchHidden = false

			if (searchText) {

				rowMeta.searchHidden = !headers.get().some((hdr) => {
					try {
						const newValue = r[hdr.headerID].toString().toLowerCase()
						return newValue.includes(searchText.toLowerCase())
					} catch (err) {
						return false
					}
				})
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
			
			let newData = await fetchFunction()
			newData = sortData(newData)
			
			setMetaData(searchData(newData))
			setMetaData(filterData(newData))
			setData(newData)
			
			selectRecord(activeRecord[primaryKey], newData)
			
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
		if(!primaryKey){console.error('Missing primary key for dataset!')}
		fetchData()
	},[])
	
	//Return a Dataset object
	return ({
		read: () => { return data },
		refresh: refreshData,
		
		selectRecord: (primaryKey) => selectRecord(primaryKey),
		getActiveRecord: getActiveRecord,
		
		status: status,
		lastResolved: lastResolved,
		lastEdited: lastEdited,
		
		//TouchPoint Controls
		setHeaders: setHeaders,
		isDataset: true,
		primaryKey: primaryKey,
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
			selectRecord(activeRecord[primaryKey], newData)
		}
	})
}