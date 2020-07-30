import {useContext, useEffect} from 'react'
import lockedContext from '../../Contexts/LockedContext'
import PropTypes from 'prop-types'
import useSystem from '../../Hooks/UseSystem'

export default function AppDrawer(props){
	
	//deccides if the component is locked based on props and parents in the tree
	const lockedFromAbove = useContext(lockedContext)
	const locked = props.locked || (lockedFromAbove && props.locked === undefined)
	
	const {drawer} = useSystem()
	
	useEffect(() => {
		
		const newProps = { ...props }
		newProps.locked = locked
		drawer.setData(newProps)
		
		
		return () => {
			drawer.setData({})
		}
	}, [])
		
	
	return null 
	//Doesn't render aything here, 
	//sends the props to System, which passes them to the SystemDrawerHandler to render outside the effect area
}

AppDrawer.propTypes = {
	style: PropTypes.object,
	locked: PropTypes.bool,
}