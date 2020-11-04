//Compart function for use with array.sort()
export function compareByPosition(aRow, bRow) {
	const aVal = aRow.position
	const bVal = bRow.position

	if (aVal > bVal) {
		return 1
	} else if (aVal < bVal) {
		return -1
	}

	return 0
}
