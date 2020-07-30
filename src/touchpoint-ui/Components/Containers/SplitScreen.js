import React from 'react'
import './SplitScreen.css'
import Split from 'react-split'
import PropTypes from 'prop-types'

export default function SplitScreen(props) {
	
	let splitSize = 50
	if(props.defaultSize){splitSize = props.defaultSize}
	
	return (
		<div className='SplitScreen'>
			<Split 
				direction="vertical" sizes={[100 - splitSize, splitSize]}
				minSize={150}
				gutterSize={8}
				snapOffset={1}
			>
				<div className="topView"></div>
				
				<div className="bottomView" style = {props.style}>
					{props.children}
				</div>
				
			</Split>
		</div>
	)
}

//Proptypes
SplitScreen.propTypes = {
	defaultSize: PropTypes.number,
	style: PropTypes.object,
	
}