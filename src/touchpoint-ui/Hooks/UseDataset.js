import {useState, useEffect} from 'react'

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
	
	//Lets you edit the active row
	function editActiveRecord(newRecord) {
		const newData = newRecord ? [...data] : []
		
		const activeIndex = data.findIndex(r => r[options.primaryKey] === activeRecord[options.primaryKey])
		
		//if you call this function without passing a new record, the record is deleted
		if(newRecord){
			newData[activeIndex] = newRecord
			setActiveRecord(newRecord)
		}else{
			data.forEach((r, idx)=>{
				if(idx !== activeIndex){
					newData.push(r)
				}
			})
			setActiveRecord({})
		}
		
		setData(newData)
	}
	
	//Automatically run the fetching function the first time, then wait for a refresh
	//If the dataset was spawned by a parent dataset, send its refresh function to the parent, so it can refresh when the parent refreshes
	useEffect(()=>{ 
		fetchData()
	},[])
	
	//Return a Dataset object
	return ({
		read: () => {return data},
		refresh: fetchData,
		
		selectRecord: (newKey) => selectRecord(newKey),
		getActiveRecord: getActiveRecord,
		setActiveRecord: editActiveRecord,
		
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