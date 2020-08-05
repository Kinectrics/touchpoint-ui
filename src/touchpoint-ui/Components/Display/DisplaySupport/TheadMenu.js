import React, {useState} from 'react'
import InfoTab from '../../Containers/InfoTab'
import InfoTabContainer from '../../Containers/InfoTabContainer'
import FilterMenu from './FilterMenu'



export default function TheadMenu(props) {
	
	const [defaultTab, setDefaultTab] = useState(props.noFilter ? 'sort' : 'filter')
	
	
	return (
		<div>
			<InfoTabContainer defaultTab={defaultTab} onTabChange={(tabID) => {
				setDefaultTab(tabID)
			}}>
				<InfoTab tabID='filter' tabTitle='Filter' hidden={props.noFilter}>
					<FilterMenu
						dataHeaders={props.dataHeaders}
						header={props.header}
						data={props.data}
					/>
				</InfoTab>

				<InfoTab tabID='sort' tabTitle='Sort' hidden={props.noSort}>
					<button>Sort Test</button>
				</InfoTab>

			</InfoTabContainer>
		</div>
	)
}
