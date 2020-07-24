import { useContext } from 'react'
import moduleContext from '../Contexts/ModuleContext'
import produce from 'immer'

export default function useModuleContext(){
	const [dataSource, setDataSource] = useContext(moduleContext)
	
	return({
		get: (key) => {return dataSource[key]},
		
		set: (key, value) => {
			setDataSource.set(produce(dataSource, draftSource => {
				draftSource[key] = value
			}))
		},
		
		clear: () => {setDataSource( {} )}
	})
}