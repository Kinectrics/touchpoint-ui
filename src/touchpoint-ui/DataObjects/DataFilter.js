export default class DataFilter{
	
	constructor(options){
		
		//The available filters - only one is actually saved and used per DataFilter
		const filterTypes = {
			equals: (val) => {
				return val.toString().toLowerCase() === this.options.value
			},
			
			includes: (val) => {
				return val.toString().toLowerCase().includes(this.options.value)
			},
			
			doesNotInclude: (val) => {
				return !val.toString().toLowerCase().includes(this.options.value)
			},
			
			lessThan: (val) => {
				return val < this.options.value
			},
			
			greaterThan: (val) => {
				return val > this.options.value
			},
			
			between: (val) => {
				return val < this.options.upperLimit && val > this.options.lowerLimit
			},
		}
		
		this.options = options
		this.displayName = options.type
		this.filter = filterTypes[options.type] ? filterTypes[options.type] : ()=>{return true}
	}
	
	
	func(val){
		try{
			return(this.filter(val))
		} catch(err){
			return false
		}
	}
}