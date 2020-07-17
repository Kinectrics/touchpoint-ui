import {useEffect} from 'react'

//Allows a system component (like the app-wide toolbar) to declare its presence, so the module container 
//can resize to fit around them
export default function usePresence(componentName) {
	const System = useSystem()

	useEffect(() => {
		System.layout['setHas' + componentName](true)

		return (() => {
			System.layout['setHas' + componentName](false)
		})
	}, [])
}