import React from 'react'
import CoreTable from './DisplaySupport/CoreTable'
import useDataset from '../../Hooks/UseDataset'
import { useEffect } from 'react'
import PropTypes from 'prop-types'

export default function MainTable(props){
	
	//Converts static data to an array
	const newProps = {...props}
	newProps.data = useDataset(props.data.isDataset ? ()=>[] : ()=>props.data )
	newProps.nestedComponent = null
	newProps.noActive = true
	
	
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

//Proptypes
MainTable.propTypes = {
	onEdit: PropTypes.func,
	headers: PropTypes.arrayOf(PropTypes.object).isRequired,

	data: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.array
	]).isRequired,

	pageSize: PropTypes.number,
	locked: PropTypes.bool,
	searchable: PropTypes.bool,
	noSort: PropTypes.bool,
	noFilter: PropTypes.bool,
	noOptions: PropTypes.bool,
	noActive: PropTypes.bool,
	nestedProps: PropTypes.object,
	nestedComponent: PropTypes.func,
	settingsID: PropTypes.string,
}