import React, {useState, useEffect, useContext} from 'react'
import CoreTable from './DisplaySupport/CoreTable'
import useDataset from '../../Hooks/UseDataset'
import useModuleData from '../../Hooks/UseModuleData'
import PropTypes from 'prop-types'
import useHeaders from '../../Hooks/UseHeaders'
import lockedContext from '../../Contexts/LockedContext'

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
	
	//Sort, search, and filter functionality
	const [metaData, setMetaData] = useState([{ visible: true, filteredBy: '' }])
	
	useEffect(()=>{
		if(!props.data.isDataset){
			data.refresh()
		}
	},[props.data])
	
	//SEARCH
	const searchText = useModuleData().get('TouchPointSearchText')
	
	function searchData() {
		if(props.searchable){
			const values = data.read()
			const newMetaData = []

			values.forEach((r, idx) => {

				const rowMeta = metaData[idx] ? metaData[idx] : {}
				rowMeta.searchHidden = false

				if (searchText) {

					const testVal = JSON.stringify(r).toLowerCase()
					rowMeta.searchHidden = !testVal.includes(searchText.toLowerCase())

				}

				newMetaData.push(rowMeta)
			})

			setMetaData(newMetaData)
		}
	}
	
	useEffect(searchData, [searchText])
	
	//FILTER
	function filterData(values) {
		const newMetaData = []

		values.forEach((r, idx) => {

			const rowMeta = metaData[idx] ? metaData[idx] : {}
			rowMeta.filteredBy = ''

			let noRender = false

			headers.get().forEach((h) => {
				const fltr = h.filter(r[h.headerID], r)

				if (!fltr && fltr != 'arrayFilter' && h.visible) {
					noRender = true
					rowMeta.filteredBy = rowMeta.filteredBy + [h.headerID] + ';'
				}
			})

			rowMeta.visible = !noRender
			newMetaData.push(rowMeta)
		})
		
		return newMetaData
	}
	
	data.filter = () => {
		const newMeta = filterData(data.read())
		setMetaData(newMeta)
		headers.embedData(data.read(), newMeta)
	}
	
	//SORT
	function sortData(values) {
		let newValues = [...values]

		headers.getSortRules().forEach((sr) => {

			if (headers.get()[sr.index] && headers.get()[sr.index].visible) {
				newValues = newValues.sort((aRow, bRow) => {

					if (sr.direction === 'asc') {
						if (aRow[sr.headerID] > bRow[sr.headerID]) {
							return 1
						} else if (aRow[sr.headerID] < bRow[sr.headerID]) {
							return -1
						}

						return 0

					} else {
						if (aRow[sr.headerID] < bRow[sr.headerID]) {
							return 1
						} else if (aRow[sr.headerID] > bRow[sr.headerID]) {
							return -1
						}
						return 0
					}
				})
			}

		})
		
		return newValues
	}
	
	data.sort = () => {
		const newData = props.noSort ? [...data.read()] : sortData(data.read()) 
		
		data.set(newData)
		data.filter()
	}
	
	//Select and return:
	//cleanProps - if a dataset is passed to the table, then no need to create one
	//newProps - if a dataset is not passed to the table, then create one and pass it
	if(props.data.isDataset){
		return (<CoreTable {...cleanProps} metaData = {metaData} locked={locked}/>)
	} else{
		return (<CoreTable {...newProps} metaData={metaData} locked={locked}/>)
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