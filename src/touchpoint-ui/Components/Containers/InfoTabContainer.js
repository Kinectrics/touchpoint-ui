import React, {useContext} from 'react'
import {Tabs, Tab} from 'react-bootstrap'
import lockedContext from '../../Contexts/LockedContext'
import PropTypes from 'prop-types'
import './InfoTabContainer.css'


export default function InfoTabContainer(props) {
	
	const lockedFromAbove = useContext(lockedContext)
	const locked = props.locked || (lockedFromAbove && props.locked ===undefined)
	
	return (
		<lockedContext.Provider value={locked}>
			<div className="InfoTabContainer">
				<Tabs 
					defaultActiveKey={props.defaultTab} 
					transition={false}
					onSelect = {(tabID)=>{
						if(props.onTabChange){props.onTabChange(tabID, locked)}
					}}
				>
					
					{React.Children.map(props.children,(child) =>{
						if(!child.props.hidden){
							return(<Tab eventKey={child.props.tabID} title={child.props.tabTitle}>
								{child}
							</Tab>)
						} else return null
					})}
					
					
					
				</Tabs>
			</div>
		</lockedContext.Provider>
	)
}

//Proptypes
InfoTabContainer.propTypes = {
	defaultTab: PropTypes.string,
	onTabChange: PropTypes.func,
	locked: PropTypes.bool,
}


