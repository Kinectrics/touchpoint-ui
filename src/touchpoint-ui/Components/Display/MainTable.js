import React, {useState, useEffect, useContext} from 'react'
import CoreTable from './DisplaySupport/CoreTable'
import useDataset from '../../Hooks/UseDataset'
import useModuleData from '../../Hooks/UseModuleData'
import PropTypes from 'prop-types'
import useHeaders from '../../Hooks/UseHeaders'
import lockedContext from '../../Contexts/LockedContext'
import {sortData, filterData, searchData} from './DisplaySupport/DataProcessing'

export default function MainTable(props){
	
	//Converts static data to a dataset
	const wrapperDataset = useDataset(props.data.isDataset ? () => [] : () => props.data, {primaryKey: props.primaryKey})
	const data = props.data.isDataset ? {...props.data} : wrapperDataset
	
	//deccides if the component is locked based on props and parents in the tree
	const lockedFromAbove = useContext(lockedContext)
	const locked = props.locked || (lockedFromAbove && props.locked === undefined) || !props.data.isDataset 
	
	const headers = useHeaders(props.headers)
	
	const newProps = {...props}
	newProps.data = data
	newProps.nestedComponent = null
	newProps.noActive = true
	newProps.headers = headers
	
	const cleanProps = {...props}
	cleanProps.data = data
	cleanProps.headers = headers
	
	const searchText = useModuleData().get('TouchPointSearchText')
	
	//Escape hatch for wraper dataset. If the array changes update the wrapper dataset to match
	useEffect(()=>{
		if(!props.data.isDataset){
			data.refresh()
		}
	},[props.data])
	
	
	
	//Sort, search, and filter functionality
	const [metaData, setMetaData] = useState([])
	
	function generateMetadata(metaOptions = {}){
		let newMeta = [...metaData]
		let newData = data.read()
		
		//sort
		if((!metaOptions.searchOnly) && (!props.noSort)){
			newData = sortData(data.read(), headers)
			data.set(newData)
		}
		
		//filter
		if ((!metaOptions.searchOnly) && (!props.noFilter)){
			newMeta = filterData(newData, headers, newMeta)
		}
		
		//search
		if(props.searchable){
			newMeta = searchData(newData, searchText, newMeta)
		}
		
		setMetaData(newMeta)
		
		//Update each header's value list 
		if (!props.noFilter){
			headers.embedData(newData, newMeta)
		}
	}
	
	
	useEffect(()=>{
		generateMetadata({searchOnly: true})
	}, [searchText])
	
	
	//Maintable was created when data had separate, search, sort, and filter functions called at different times. 
	//Now, its all part of generateMetadata, so any time it tries to search, sort or filter it can just generate metadata
	data.sort = generateMetadata
	data.filter = generateMetadata
	data.search = generateMetadata
	
	//Select and return:
	//cleanProps - if a dataset is passed to the table, then no need to create one
	//newProps - if a dataset is not passed to the table, then create one and pass it
	if(props.data.isDataset){
		return (<CoreTable {...cleanProps} metaData = {metaData} locked={locked} searchText={searchText}/>)
	} else{
		return (<CoreTable {...newProps} metaData={metaData} locked={locked} searchText={searchText}/>)
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
	style: PropTypes.object,
	noLoading: PropTypes.bool,
}