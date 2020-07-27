import {useState} from 'react'
import produce from 'immer'
import DataHeader  from '../DataObjects/DataHeader'


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

	//Saves a list of unique values in each column (header) - to be used in the filter dropdowns
	function embedData(data, metaData) {
		//using Immer to edit the header state while keeping it immutable
		setHeaders(produce(headers, (draft) => {
			draft.map((hdr) => {
				hdr.embedData(data, metaData)
			})
		}))
	}

	const [headers, setHeaders] = useState(normalize(dataHeaders.map((hdr)=>{
		return(new DataHeader(hdr))
	})))

	return ({
		get: () => {return headers},
		set: (val) => {setHeaders(normalize(val))},
		embedData: embedData
	})
}