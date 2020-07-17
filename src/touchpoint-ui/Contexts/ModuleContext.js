//Context hooks for variable and functions that are system wide
import { createContext } from 'react'

//Used by a module to talk to it's children (eg. tying a searchbar to a maintable)
const moduleContext = createContext({
	searchText: ''
})
export default moduleContext 