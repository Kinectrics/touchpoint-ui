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
	const [headers, setHeaders] = useState({ get: () => { return [] } })
	const [activeRecord, setActiveRecord] = useState({})
	
	function setActiveRecordHandler(newPrimaryKey) {

		const newIndex = data.findIndex(r => r[primaryKey] === newPrimaryKey)
		
		const newRecord = newIndex > -1
		? { primaryKey: newPrimaryKey, index: newIndex }
		: {}
		
		setActiveRecord(newRecord)
		return(newRecord)
	}
	
	
	function getActiveRecord(){
		//Ensure the row is valid and has the correct primary key
		if (data[activeRecord.index] && (data[activeRecord.index][primaryKey] === activeRecord.primaryKey) ){
			return data[activeRecord.index]
			
		} else if(activeRecord.primaryKey !== undefined){ //if not, attempt to find the correct row index
			return setActiveRecordHandler(activeRecord.primaryKey)
		}
		
		return {} //if there's no matching row, return blank
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
				//filter
				const fltr = h.filter(r[h.headerID], r)
				
				if (!fltr && fltr !='arrayFilter'){
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
		
		headers.get().forEach((hdr)=>{
			if (hdr.sortRule && hdr.visible) {
				newValues = newValues.sort((aRow, bRow) => {
					
					if (hdr.sortRule === 'asc') {
						return aRow[hdr.headerID] > bRow[hdr.headerID] ? 1 : -1
					} else {
						return aRow[hdr.headerID] > bRow[hdr.headerID] ? -1 : 1
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
			
			let value = await fetchFunction()
			value = sortData(value)
			
			setMetaData(searchData(value))
			setMetaData(filterData(value))
			setData(value)
			
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
		getMetaData: ()=>{ return metaData },
		getActiveRecord: getActiveRecord,
		setActiveRecord: setActiveRecordHandler,

		refresh: refreshData,

		status: status,
		lastResolved: lastResolved,
		lastEdited: lastEdited,
		setHeaders: setHeaders,
		isDataset: true,
		primaryKey: primaryKey,
		
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
		}
	})
}