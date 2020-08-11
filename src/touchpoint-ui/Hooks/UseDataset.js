import {useState, useEffect} from 'react'
import useModuleData from '../Hooks/UseModuleData'


//Initialises a Dataset and caches the value
export default function useDataset(fetchFunction, defaultValue = [{}]) {
	
	//The array contains an empty object by default
	const [data, setData] = useState(defaultValue)
	const [metaData, setMetaData] = useState([{visible: true, filteredBy: ''}])
	const [status, setStatus] = useState('Pending')
	const [lastResolved, setLastResolved] = useState()
	const [headers, setHeaders] = useState({ get: () => { return [] } })
	
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
			if (hdr.sortRule) {
				newValues = newValues.sort((aRow, bRow) => {
					if (hdr.sortRule === 'asc') {
						return aRow[hdr.headerID] - bRow[hdr.headerID]
					} else {
						return bRow[hdr.headerID] - aRow[hdr.headerID]
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
			const value = sortData(await fetchFunction())
			
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
	function refreshData(){
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
		getMetaData: ()=>{ return metaData },

		refresh: refreshData,

		status: status,
		lastResolved: lastResolved,
		setHeaders: setHeaders,
		isDataset: true,
		
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
	})
}