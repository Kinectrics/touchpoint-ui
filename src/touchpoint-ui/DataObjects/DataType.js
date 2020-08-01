export default class DataType{
	
	constructor(kind, options){
		if(kind){this.kind = kind.toLowerCase()} else{this.kind = 'string'}
		this.options = options
	}
	
	//checks if an input is valid for the datatype
	validate(input){
		switch(this.kind){
			case 'string': 
				return true
			
			case 'number':
				
				try{
					parseFloat(input)	
					return true
				} catch(err){return false}
				
			case 'list': return this.options.listValues.includes(input)			
		}
		
		//if its not a valid type then ignore validation and just return true
		return true
	}
	
	//Compares a value an search string to see if the value should be included in the search
	search(value, searchText){
		try{
			newValue = value.toString().toLowerCase()
			return newValue.includes(searchText.toLowerCase())
		} catch(err){
			return false
		}
	}
}


