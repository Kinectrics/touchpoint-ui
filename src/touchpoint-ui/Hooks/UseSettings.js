import {useEffect, useRef} from 'react'
import useSystem from './UseSystem'

export default function useSettings(settingsID, applySettings){
	const {get, save} = useSystem().Settings
	
	const debouncer = useRef()
	
	useEffect(() => {
		const fetchAndApply = async () => {
			try{
				const token = await get(settingsID)
				applySettings(token)
			} catch(err){
				console.error(err)
			}
		}
		
		if(settingsID){fetchAndApply()}
	}, [])
	
	
	return (newToken) => {
		//Prevent creating many tokens too fast
		clearTimeout(debouncer.current)
		
		debouncer.current = setTimeout(() => {
			save(settingsID, newToken)
		}, 2000)
	}
}