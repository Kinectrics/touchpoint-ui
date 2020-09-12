import {useState, useEffect} from 'react'
import useModuleData from '../Hooks/UseModuleData'


//Initialises a Dataset and caches the value
export default function useDataset(fetchFunction, options = {}) {
	
	//The array contains an empty object by default
	const [data, setData] = useState(options.defaultValue ? options.defaultValue : [])
	const [status, setStatus] = useState('Pending')
	const [lastResolved, setLastResolved] = useState()
	const [lastEdited, setLastEdited] = useState()
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
	
	//Fetch data and update state once the operation is complete. Keep the old value in the meantime
	async function fetchData() {
		setStatus('Pending')

		try {
			
			const newData = await fetchFunction()
			setData(newData)
			
			selectRecord(activeRecord[options.primaryKey], newData)
			
			setStatus('Resolved')
			setLastResolved(Date())
			return 'Resolved'
			
		} catch (e) {
			setStatus('Rejected')
			console.error(e)
			return 'Rejected'
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
		isDataset: true,
		primaryKey: options.primaryKey,
		
		set: (newData)=>{
			setData(newData)
			setLastEdited(Date())
			selectRecord(activeRecord[options.primaryKey], newData)
		}
	})
}