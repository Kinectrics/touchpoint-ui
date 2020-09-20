import {useEffect} from 'react'
import useSystem from './UseSystem'

//Allows a system component (like the app-wide toolbar) to declare its presence, so the module container 
//can resize to fit around them
export default function usePresence(componentName, height, width) {
	
	const {Layout} = useSystem()
	
	function refreshCSS(layoutSettings){
		
		let heightCSS = 'calc(100%'
		let widthCSS = 'calc(100%'
		
		Object.values(layoutSettings.heights).forEach((h)=>{
			
			if(h){
				heightCSS = heightCSS + ' - ' + h
			}
		})
		
		Object.values(layoutSettings.widths).forEach((w)=>{
			if(w){
				widthCSS = widthCSS + ' - ' + w
			}
		})
		
		layoutSettings.heightCSS = heightCSS + ')'
		layoutSettings.widthCSS = widthCSS + ')'
		
	}
	
	
	
	useEffect(() => {
		
		const newLayout = {...Layout.get()}
		newLayout.widths[componentName] = width
		newLayout.heights[componentName] = height

		refreshCSS(newLayout)
		Layout.set(newLayout)
		
		return ()=>{
			const newLayout = { ...Layout.get() }
			newLayout.widths[componentName] = 0
			newLayout.heights[componentName] = 0

			refreshCSS(newLayout)
			Layout.set(newLayout)
		}
		
	},[])
		
}