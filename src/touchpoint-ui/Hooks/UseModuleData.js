import { useContext } from 'react'
import moduleContext from '../Contexts/ModuleContext'

export default function useModuleContext(){
	const [dataSource, setDataSource] = useContext(moduleContext)
	
	return({
		get: (key) => {return dataSource[key]},
		
		set: (key, value) => {
			const newSource = {...dataSource}
			newSource[key] = value
			setDataSource(newSource)
		},
		
		clear: () => {setDataSource( {} )}
	})
}