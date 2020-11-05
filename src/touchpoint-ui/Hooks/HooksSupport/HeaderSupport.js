//Compart function for use with array.sort()
function compareByPosition(aRow, bRow) {
	const aVal = aRow.index
	const bVal = bRow.index

	if (aVal > bVal) {
		return 1
	} else if (aVal < bVal) {
		return -1
	}

	return 0
}




//Sorts headers so the array respects position order
export function sortByPosition(headers) {
	let newHeaders = [...headers].sort(compareByPosition)
	newHeaders = newHeaders.map((h,idx)=>{
		h.index = idx
		return h
	})
	return newHeaders
}




//switches the 'index properties and resorts the array
function move(newHeaders, headerIndex, newPosition){
	const src = parseFloat(headerIndex)
	const dest = parseFloat(newPosition)
	
	const L = newHeaders.length

	if (src > dest) {
		for (let i = dest; i < src; i++) {
			newHeaders[i].index = newHeaders[i].index + 1
		}
	} else {
		for (let i = src + 1; i <= dest && i<L; i++) {
			newHeaders[i].index = newHeaders[i].index - 1
		}
	}
	
	newHeaders[headerIndex].index = newPosition
	return sortByPosition(newHeaders)
}




//Moves a header from postion to a new position, verifies any columns tied together will stay together
export function setHeaderPosition(headers, setHeaders, headerIndex, newPosition){
	
	let newHeaders = [...headers]
	newHeaders = move(newHeaders, headerIndex, newPosition)
	
	//verify order ("after" header props)
	for(let i = 0; i < newHeaders.length; i++){
		const h = newHeaders[i]
		
		if(h.after){
			const parentIndex = newHeaders.findIndex(d=>d.headerID === h.after)
			if(parentIndex !== h.index - 1){
				newHeaders = move(newHeaders, h.index, parentIndex + 1)
			}
		}
	}
	
	setHeaders(newHeaders)
}