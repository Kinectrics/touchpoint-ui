import moment from 'moment'

//format for displaying certain types of data
const formatFunctions = {
	date: (cellValue) => cellValue ? moment(new Date(cellValue)).format('DD-MMM-YY') : '',
	boolean: (cellValue) => cellValue ? 'True' : 'False',
	other: (cellValue) => cellValue,
}


//Takes a user input and changes it to the correct data type (eg. Date string to new Date object)
const parseFunctions = {
	date: (input) => {
		const testVal = input.toString().toLowerCase()
		
		if (testVal === 'today' || testVal === 'td') { return moment().toISOString() }
		if (testVal === 'tomorrow' || testVal === 'tm') { return moment().add(1, 'day').toISOString() }
		if (testVal === 'yesterday' || testVal === 'yd') { return moment().subtract(1, 'day').toISOString() }
		
		//Special case for dates with no year - default to current year
		// const regNodash = /^[0-9]*(?:_?[a-z]+)*$/
		// const regWithDash = /^[0-9]*[-](?:_?[a-z])*$/
		
		if(isNaN(parseFloat(input.slice(-1)))){
			const newInput = input + new Date().getFullYear()
			return moment(new Date(newInput)).toISOString()
		}
		
		return moment( new Date(input) ).toISOString()
	},

	boolean: (input) => {
		const testVal = input.toString().toLowerCase()
		if (testVal === 'true' || testVal === 'yes' || testVal == 1 || testVal === 'y' || testVal === 't') {
			return true
		} else return false
	},
	
	number: (input) => {
		const newValue = Number(input)
		if (!isNaN(newValue)) {
			return newValue
		} else {
			throw new Error('invalid input - not a number')
		}
	},

	other: (input) => input,
}


//Compares 2 values that may not be directly equal (eg. date object and date string)
const compareFunctions = {
	date: (a, b) => moment( new Date(a) ).isSame(new Date(b), 'day'),
	boolean: (a, b) => this.parse(a) === this.parse(b),
	other: (a, b) => a == b,
}


//
export default class DataType{
	constructor(type){
		this.format = formatFunctions[type] ? formatFunctions[type] : formatFunctions.other
		this.parse = parseFunctions[type] ? parseFunctions[type] : parseFunctions.other
		this.compare = compareFunctions[type] ? compareFunctions[type] : compareFunctions.other
	}
}