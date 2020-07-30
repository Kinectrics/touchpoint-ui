import React, {useEffect} from 'react'
import './Module.css'
import PropTypes from 'prop-types'
import useModuleData from '../../Hooks/UseModuleData'

export default function Module(props) {
	
	const moduleData = useModuleData()
	
	function keyDownHandler(e){
		const isCtrl = e.ctrlKey || e.metaKey

		if (isCtrl && e.keyCode === 70) {
			e.preventDefault()
			console.log(moduleData.get('TouchPointSearchRef'))

			if (moduleData.get('TouchPointSearchRef')) {
				moduleData.get('TouchPointSearchRef')()
			}
		}
	}
	
	useEffect(()=>{
		moduleData.clear()
		
		window.addEventListener('keydown', keyDownHandler)
		
		return(()=>{
			moduleData.clear()
			window.removeEventListener('keydown', keyDownHandler)
		})
		
	}, [])
	
	return (
		<div className={'Module ' + props.moduleName} style = {props.style}>
			{props.children}	
		</div>
	)
}

//Proptypes
Module.propTypes = {
	moduleName: PropTypes.string,
	style: PropTypes.object,
}
