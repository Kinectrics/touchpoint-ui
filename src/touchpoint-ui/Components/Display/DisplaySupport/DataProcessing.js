
//SEARCH
export function searchData(values, searchText, metaData){
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

	return newMetaData
}


// //FILTER
export function filterData(values, headers, metaData) {
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


//SORT
export function sortData(values, headers) {
	let newValues = [...values]

	headers.getSortRules().forEach((sr) => {

		if (headers.get()[sr.index] && headers.get()[sr.index].visible) {
			newValues = newValues.sort((aRow, bRow) => {

				const aVal = aRow[sr.headerID] ? aRow[sr.headerID].toString().toLowerCase() : ''
				const bVal = bRow[sr.headerID] ? bRow[sr.headerID].toString().toLowerCase() : ''

				if (sr.direction === 'asc') {
					if (aVal > bVal) {
						return 1
					} else if (aVal < bVal) {
						return -1
					}

					return 0

				} else {
					if (aVal < bVal) {
						return 1
					} else if (aVal > bVal) {
						return -1
					}
					return 0
				}
			})
		}

	})

	return newValues
}

