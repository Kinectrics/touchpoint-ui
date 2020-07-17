import {useState} from 'react'
import produce from 'immer'


//Crates a set of DataHeaders, for use with a mainTable
export default function useHeaders(dataHeaders = []) {

	//add an index prop to each DataHeader object, so it's easier to locate in the array 
	function setIndex(hdr, i) {
		hdr.index = i
		return hdr
	}

	//Saves a list of unique values in each column (header) - to be used in the filter dropdowns
	function embedData(data) {
		//using Immer to edit the header state while keeping it immutable
		setHeaders(produce(headers, (draft) => {
			draft.map((hdr) => {
				hdr.embedData(data)
			})
		}))
	}

	const [headers, setHeaders] = useState(dataHeaders.map(setIndex))

	return ({
		get: () => { return headers },
		set: (val) => { setHeaders(val.map(setIndex)) },
		embedData: embedData
	})
}