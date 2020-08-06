import {useEffect} from 'react'
import useSystem from './UseSystem'

export default function useSettings(settingsID, applySettings){
	const {get, save} = useSystem().Settings
	
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
		save(settingsID, newToken)
	}
}