import moment from 'moment'

export default class DataFilter{
	
	constructor(options){
		this.options = options
		this.displayName = options.type
		this.filter = DataFilter.getFilterTypes()[options.id] ? DataFilter.getFilterTypes()[options.id].func : ()=>{return true}
		this.displayName = DataFilter.getFilterTypes()[options.id].displayName
		this.args = DataFilter.getFilterTypes()[options.id].args
		this.options.value = options.value.toString().toLowerCase()
	}
	
	
	func(val){
		try{
			return(this.filter(val, this.options))
		} catch(err){
			return false
		}
	}
	
	
	static getFilterTypes(){
		
		return {
			
			includes: {
				func: (val, options) => {
					return val.toString().toLowerCase().includes(options.value)
				},
				displayName: 'Includes',
				availableTo: ['string'],
			},

			doesNotInclude: {
				func: (val, options) => {
					return !val.toString().toLowerCase().includes(options.value)
				},
				displayName: "Doesn't Include",
				availableTo: ['string'],
			},

			lessThan: {
				func: (val, options) => {
					return val < options.value || moment(val).isBefore(options.value, 'day')
				},
				displayName: 'Less than',
				availableTo: ['number', 'date'],
			},

			greaterThan: {
				func: (val, options) => {
					return val > options.value || moment(val).isAfter(options.value, 'day')
				},
				displayName: 'Greater than',
				availableTo: ['number', 'date'],
			},
			
			equals: {
				func: (val, options) => {
					return val.toString().toLowerCase() == options.value || moment(val).isSame(options.value, 'day')
				},
				displayName: 'Equals',
				availableTo: ['string', 'number', 'boolean', 'date'],
			},

			doesNotEqual: {
				func: (val, options) => {
					return val.toString().toLowerCase() != options.value && !moment(val).isSame(options.value, 'day')
				}, 
				displayName: "Doesn't Equal",
				availableTo: ['string', 'number', 'boolean', 'date'],
			},
			
		}
		
	}
}