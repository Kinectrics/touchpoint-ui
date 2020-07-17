//Context hooks for variable and functions that are system wide
import { createContext } from 'react'

//System wide variables (eg. activeUser, theming functions etc.) to be defined in the App component. 
const systemContext = createContext({})
export default systemContext 
