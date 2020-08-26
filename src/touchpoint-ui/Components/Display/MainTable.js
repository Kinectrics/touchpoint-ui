import React from 'react'
import CoreTable from './DisplaySupport/CoreTable'
import useDataset from '../../Hooks/UseDataset'
import { useEffect } from 'react'

export default function MainTable(props){
	
	//Converts static data to an array 
	const newProps = {...props}
	newProps.data = useDataset(props.data.isDataset ? ()=>[] : ()=>props.data )
	
	useEffect(()=>{
		if (!props.data.isDataset){
			newProps.data.refresh()
		}
	},[props.data])
	
	if(props.data.isDataset){
		
		return (<CoreTable {...props}/>)
		
	} else{
		
		return (<CoreTable {...newProps} />)
	}
	
}
