//Support functions used by the DataHeader object


//A special type of filter that deals with the values you select in the dropdown menu of each header
export function valueFilter(cellValue, uniqueValues){
	return (uniqueValues[cellValue] || uniqueValues[cellValue] === undefined)
}



//A special type of filter that deals with the values you select in the dropdown menu of each header (for tags)
export function tagFilter(cellValue, uniqueValues){
	return cellValue.some(cv => uniqueValues[cv] || uniqueValues[cv] === undefined)
}



//Generates the list of unique values for a given column, from a set of data. 
//If typee==='tags', separates the tags into individual values
export function uniqueByColumn(data, metaData, columnID, oldValues){
	const res = {}

	data.forEach((r, idx) => {
		if(metaData[idx] && (metaData[idx].visible || metaData[idx].filteredBy === columnID + ';') && !metaData[idx].searchHidden){
			
			const testVals = Array.isArray(r[columnID]) ? r[columnID] : [ r[columnID] ]
			
			//Regular values
			testVals.forEach(v=>{
				if (oldValues[v] === undefined) {
					res[v] = true
				} else {
					res[v] = oldValues[v]
				}
			})
		}
	})

	const orderedRes = {}

	Object.keys(res).sort().forEach((key) => {
		orderedRes[key] = res[key]
	})

	return orderedRes
}