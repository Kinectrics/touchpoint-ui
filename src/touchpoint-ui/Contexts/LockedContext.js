//Context hooks for variable and functions that are system wide
import { createContext } from 'react'

//Locking context. If a compnent is locked, then all child components will be locked as well 
//Only certain components support locking (see docs for more information)
const lockedContext = createContext(false)
export default lockedContext 