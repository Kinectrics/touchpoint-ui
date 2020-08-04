import {useSystem} from './UseSystem'

export default function useSettings(settingsID, applySettings){
	const {get, save} = useSystem().Settings
	
	useEffect(() => {
		
		try{
			const token = await get(settingsID)
			applySettings(token)
		} catch(err){
			console.error(err)
		}
		
	}, [])
	
	
	return (newToken) => {
		save(settingsID, newToken)
	}
	
}