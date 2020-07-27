import DataType from "./DataType"

export default class DataHeader{
	
	constructor(options){
		
		this.headerID = options.headerID
		this.displayName = options.displayName
		this.width = options.width ? options.width : 10
		this.required = options.required ? options.required : false
		this.visible = (!options.visible === undefined) ? options.visible : true
		this.index = options.index
		this.onEdit = options.onEdit ? options.onEdit : null
		this.locked = options.locked ? options.locked : false
		this.dataType = options.dataType ? options.dataType : new DataType('string') 
		this.styling = options.styling ? options.styling : null
		this.uniqueValues = {}
		
		//Default filter list only has 1 functions (array filter)
		//By default no values are selected, which is the same as saying 'select all'
		this.filterList = {
			arrayFilter: {
				func: (cellValue) => {
					return (this.uniqueValues[cellValue] || this.uniqueValues[cellValue] === undefined)
				}, displayName: 'Array Filter'
			}
		}
		
	}

	
	
	filter(cellValue, dataRow){
		//Check if any of the filters fail
		//If any filters fail, res will be true. Return the opposite
		return !Object.keys(this.filterList).some( (f)=>{
			return !this.filterList[f].func(cellValue, dataRow)
		})
	}
	
	
	addFilter(filterID, filterFunction, displayName){
		this.filterList[filterID] = {func: filterFunction, displayName: displayName, id: filterID}
	}
	
	
	removeFilter(filterID){
		delete this.filterList[filterID]
	}
	
	
	//Saves a list of unique values in the column - to be used in the filter dropdowns
	embedData(data, metaData){
		this.uniqueValues = uniqueByColumn(data, metaData, this.headerID, this.uniqueValues)
	}
	
	
	selectAll(setVal){
		Object.keys(this.uniqueValues).map((uv)=>{
			this.uniqueValues[uv] = setVal
		})
	}
	
	//checks if there are any active filters, including the array filter
	hasFilter(){
		//array filter is always there, check if any other filters are there
		let testRes = Object.keys(this.filterList).length === 1
		
		//if there are no other filters, check if the array filter is active
		if(testRes){
			Object.keys(this.uniqueValues).forEach((val) => {
				if (!this.uniqueValues[val]){testRes = false}
			})
		}

		return !testRes
	}
	
	clearFilter(){
		this.filterList = {
			arrayFilter: {
				func: (cellValue) => {
					return (this.uniqueValues[cellValue] || this.uniqueValues[cellValue] === undefined)
				}, displayName: 'Array Filter'
			}
		}
		
		this.selectAll(true)
	}
	
	setVisible(bool){
		this.visible = bool
	}
}


//Returns an array of unique values from a column of DataRow objects
function uniqueByColumn(data, metaData, columnID, oldValues) {
	const res = {}
	
	data.forEach((r, idx) => {
		
		if (metaData[idx].visible || metaData[idx].filteredBy === columnID + ';'){
			//New vales added as true, old values keep their value
			if (oldValues[r[columnID]] === undefined){
				res[r[columnID]] = true
			} else{
				res[r[columnID]] = oldValues[r[columnID]]
			}
		}
	})
	
	const orderedRes = {}
	
	Object.keys(res).sort().forEach((key)=>{
		orderedRes[key] = res[key]
	})

	return orderedRes
}