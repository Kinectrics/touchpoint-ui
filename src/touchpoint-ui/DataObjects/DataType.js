export default class DataType{
	
	constructor(kind, options){
		if(kind){this.kind = kind.toLowerCase()} else{this.kind = 'string'}
		this.options = options
	}
	
	
	//checks if an input is valid for the datatype
	validate(input){
		
		const validators = {
			string: ()=>{return true},
			
			number: (val)=>{
				try{
					parseFloat(val)	
					return true
				} catch(err){return false}
			}
		}
		
		//if its not a valid type then ignore validation and just return true
		return validators[this.kind](input)
	}
	
	
	//Compares a value an search string to see if the value should be included in the search
	search(value, searchText){
		try{
			const newValue = value.toString().toLowerCase()
			return newValue.includes(searchText.toLowerCase())
		} catch(err){
			return false
		}
	}
}