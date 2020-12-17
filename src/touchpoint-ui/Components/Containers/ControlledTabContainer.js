import React, { useContext } from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import lockedContext from '../../Contexts/LockedContext'
import PropTypes from 'prop-types'
import './ControlledTabContainer.css'


export default function ControlledTabContainer(props) {

	const lockedFromAbove = useContext(lockedContext)
	const locked = props.locked || (lockedFromAbove && props.locked === undefined)

	return (
		<lockedContext.Provider value={locked}>
			<div className="ControlledTabContainer" style={props.style}>
				{React.Children.map(props.children, (child) => {
					
					if ((props.activeTab !== child.props.tabID) && props.singleMount){
						return null
					}
					
					if (!child.props.hidden) {
						return (<div 
							className='tabWrapper' 
							style={props.activeTab === child.props.tabID ? {} : {display: 'None'}}
						>
							{child}
						</div>)
					} else return null
				})}
				
			</div>
		</lockedContext.Provider>
	)
}

//Proptypes
ControlledTabContainer.propTypes = {
	activeTab: PropTypes.string,
	onTabChange: PropTypes.func,
	locked: PropTypes.bool,
	style: PropTypes.object,
	singleMount: PropTypes.bool,
}


