

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
	const newHeaders = [...headers].sort(compareByPosition)
	return newHeaders
}

//Moves a header from postion to a new position
export function setHeaderPosition(headers, setHeaders, headerIndex, newPosition) {
	let newHeaders = [...headers]
	
	const src = parseFloat(headerIndex)
	const dest = parseFloat(newPosition)
	
	console.log({src, dest})
	
	if(src > dest){
		for(let i = dest; i < src; i++){
			newHeaders[i].index = newHeaders[i].index + 1
		}
	} else{
		for (let i = src+1; i <= dest; i++) {
			newHeaders[i].index = newHeaders[i].index - 1
		}
	}
	
	newHeaders[headerIndex].index = newPosition
	newHeaders=sortByPosition(newHeaders)
	console.log({newHeaders})
	setHeaders(newHeaders)
}