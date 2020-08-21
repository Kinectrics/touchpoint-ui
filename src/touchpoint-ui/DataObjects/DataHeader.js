import DataFilter from './DataFilter'
import moment from 'moment'


export default class DataHeader{
	
	constructor(options){
		this.headerID = options.headerID
		this.displayName = options.displayName
		this.width = options.width ? options.width : 100
		this.required = options.required ? options.required : false
		this.visible = (!options.visible === undefined) ? options.visible : true
		this.index = options.index
		this.onEdit = options.onEdit ? options.onEdit : null
		this.locked = options.locked ? options.locked : false
		this.styling = options.styling ? options.styling : null
		this.uniqueValues = {}
		this.type = options.type ? options.type : 'string'
		
		//Default filter list only has 1 functions (array filter)
		this.filterList = {
			arrayFilter: {
				func: (cellValue) => {
					return (this.uniqueValues[cellValue] || this.uniqueValues[cellValue] === undefined)
				}, 
			},
		}
		
		//format for displaying certain types of data
		const formatFunctions = {
			date: (cellValue) => cellValue ? moment(cellValue).format('DD-MMM-YY') : '',
			boolean: (cellValue) => cellValue ? 'True' : 'False',
			other: (cellValue) => cellValue,
		}
		
		//Takes a user input and changes it to the correct data type (eg. Date string to new Date object)
		const parseFunctions = {
			date: (input) => {
				
				if(input.toString().toLowerCase() === 'today'){
					const fullDate = new Date()
					return new Date()
				}
				return new Date(input)
			},
			
			boolean: (input) => {
				const testVal = input.toString().toLowerCase()
				if(testVal === 'true' || testVal === 'yes' || testVal == 1 || testVal === 'y'){
					return true
				} else return false
			},
		
			number: (input) => {
				const newValue = Number(input)
				if(!isNaN(newValue)){
					return newValue
				} else{
					throw new Error('invalid input - not a number')
				}
			},
			
			other: (input) => input,
		}
		
		//Compares 2 values that may not be directly equal (eg. date object and date string)
		const compareFunctions = {
			date: (a,b) => moment(a).isSame(b,'day'),
			boolean: (a,b) => this.parse(a) === this.parse(b),
			other: (a,b) => a==b,
		}
		
		this.format = formatFunctions[this.type] ? formatFunctions[this.type] : formatFunctions.other
		this.parse = parseFunctions[this.type] ? parseFunctions[this.type] : parseFunctions.other
		this.compare = compareFunctions[this.type] ? compareFunctions[this.type] : compareFunctions.other
		
	}

	
	filter(cellValue, dataRow){
		//Check if any of the filters fail
		//If any filters fail, res will be true. Return the opposite
		return !Object.keys(this.filterList).some( (f)=>{
			return !this.filterList[f].func(cellValue, dataRow)
		})
	}
	
	
	addFilter(options){
		this.filterList[options.id] = new DataFilter({...options, headerType: this.type})
	}
	
	
	removeFilter(filterID){
		delete this.filterList[filterID]
	}
	
	
	//Saves a list of unique values in the column - to be used in the filter dropdowns
	embedData(data, metaData){
		this.uniqueValues = uniqueByColumn(data, metaData, this.headerID, this.uniqueValues, this.type)
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
}


//Returns an array of unique values from a column of DataRow objects
function uniqueByColumn(data, metaData, columnID, oldValues, type) {
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
	const sortFunction = type === 'date' ? (a, b) => {
		return a - b
	} : undefined
	
	Object.keys(res).sort(sortFunction).forEach((key)=>{
		orderedRes[key] = res[key]
	})
	
	return orderedRes
}