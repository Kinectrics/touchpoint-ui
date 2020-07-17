//Context hooks for variable and functions that are system wide
import { createContext } from 'react'

//used by dropdown menus to talk to items inside of themselves 
const menuContext = createContext({})
export default menuContext 
