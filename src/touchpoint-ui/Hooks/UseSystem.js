import systemContext from '../Contexts/SystemContext'
import {useContext} from 'react'

//Returns a refference to the System object - allowing modules to interact with the parent app
export default function useSystem() {
	return useContext(systemContext)
}