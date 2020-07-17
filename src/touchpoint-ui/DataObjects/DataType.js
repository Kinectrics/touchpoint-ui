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
				
			case 'list':
				if(this.options.includes.listValues(input)){
					return true
				} else{return false}
			
			case 'custom':
				//This needs so much work...
				if(this.options.validator(input)){
					return true
				} else{return false}				
		}
		
		//if its not a valid type then ignore validation and just return true
		return true
	}
	
	//Compares a value an search string to see if the value should be included in the search
	search(value, searchText){
		switch(this.kind){
			case 'string': 
				if (typeof value  === 'string'){
					value = value.toLowerCase()
					return value.includes(searchText.toLowerCase())
				} else{return false}
		}
		
		//if its not a vald type just return false until i deccide how to handle this better
		return false
	}
	
}


