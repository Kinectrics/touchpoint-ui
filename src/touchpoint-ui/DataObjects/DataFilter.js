export default class DataFilter{
	
	constructor(options){
		this.options = options
		this.displayName = options.type
		this.filter = DataFilter.getFilterTypes()[options.id] ? DataFilter.getFilterTypes()[options.id].func : ()=>{return true}
		this.displayName = DataFilter.getFilterTypes()[options.id].displayName
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
			equals: {
				func: (val, options) => {
					return val.toString().toLowerCase() === options.value
				},
				displayName:'Equals',
				availableTo: ['string', 'number']
			},
			
			doesNotEqual: {
				func: (val, options) => {
					return val.toString().toLowerCase() !== options.value
				},
				displayName: "Doesn't Equal",
				availableTo: ['string', 'number']
			},

			includes: {
				func: (val, options) => {
					return val.toString().toLowerCase().includes(options.value)
				},
				displayName: 'Includes',
				availableTo: ['string']
			},

			doesNotInclude: {
				func: (val, options) => {
					return !val.toString().toLowerCase().includes(options.value)
				},
				displayName:  "Doesn't Include",
				availableTo: ['string']
			},

			lessThan: {
				func: (val, options) => {
					return val < options.value
				},
				displayName: 'Less than',
				availableTo: ['number']
			},

			greaterThan: {
				func: (val, options) => {
					return val > options.value
				},
				displayName: 'Greater than',
				availableTo: ['number']
			},

			between: {
				func: (val, options) => {
					return val < options.upperLimit && val > options.lowerLimit
				},
				displayName: 'Between',
				availableTo: ['number']
			},
		}
		
		
	}
}