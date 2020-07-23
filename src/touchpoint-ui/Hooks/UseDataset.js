import {useState, useContext, useEffect} from 'react'
import produce from 'immer'
import moduleContext from '../Contexts/ModuleContext'


//Initialises a Dataset and caches the value
export default function useDataset(fetchFunction, defaultValue = [{}]) {

	//The array contains an empty object by default
	const [data, setData] = useState(defaultValue)
	const [first, setFirst] = useState(true)
	const [status, setStatus] = useState('Pending')
	const [rejection, setRejection] = useState()
	const [lastResolved, setLastResolved] = useState()
	const [lastRejected, setLastRejected] = useState()
	const [headers, setHeaders] = useState({ get: () => { return [] } })
	
	const {searchText} = useContext(moduleContext)
	
	useEffect(() => {
		
		setData(produce(data, draftData => {
			draftData.map((r) => {

				r.TouchPointMetaSearchHide = false
				
				if(searchText.trim()){
					r.TouchPointMetaSearchHide = !headers.get().some((hdr) => {
						return hdr.dataType.search(r[hdr.headerID], searchText)
					})
				}

				return r
			})
		}))
		
	}, [searchText])

	//Filters the data based on given headers
	function filterData(values){

		//Apply the filters to the data (define what rows are visible)
		return produce(values, (draftValues) => {

			draftValues.map((r) => {
				r.TouchPointMetaFilteredBy = ''

				let noRender = false
				
				headers.get().forEach((h) => {
					
					//filter
					if (!h.filter(r[h.headerID], r)) {
						noRender = true
						r.TouchPointMetaFilteredBy = r.TouchPointMetaFilteredBy + [h.headerID] + ';'
					}
				})

				r.TouchPointMetaVisible = !noRender
				return r
			})
		})
	}
	
	//Fetch data and update state once the operation is complete. Keep the old value in the meantime
	async function fetchData() {
		setStatus('Pending')
		const res = fetchFunction()

		try {
			const value = filterData(await res)

			setData(value)
			setStatus('Resolved')
			setRejection(null)
			setLastResolved(Date())

			return status
		} catch (e) {
			setStatus('Rejected')
			setRejection(e)
			setLastRejected(Date())

			return status
		}
	}


	//Automatically run the fetching function the first time, then wait for a refresh
	if (first) {
		setFirst(false)
		fetchData()
	}

	//Return a Dataset object
	return ({
		read: () => { return data },

		refresh: () => {
			if (status !== 'Pending') {
				fetchData()
			}
		},

		set: (val) => { setData(val) },

		status: status,
		rejection: rejection,
		lastResolved: lastResolved,
		lastRejected: lastRejected,
		setHeaders: setHeaders,
		isDataset: true,
		filter: () => {
			const newData = filterData(data)
			setData(newData)
			headers.embedData(newData)
		},
	})
}