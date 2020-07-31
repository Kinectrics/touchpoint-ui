import {useContext, useEffect} from 'react'
import lockedContext from '../../Contexts/LockedContext'
import PropTypes from 'prop-types'
import useSystem from '../../Hooks/UseSystem'

export default function AppDrawer(props){
	
	//deccides if the component is locked based on props and parents in the tree
	const lockedFromAbove = useContext(lockedContext)
	const locked = props.locked || (lockedFromAbove && props.locked === undefined)
	
	const {Drawer} = useSystem()
	
	useEffect(() => {
		
		const newProps = { ...props }
		newProps.locked = locked
		newProps.exists = true
		Drawer.setData(newProps)
		
		
		if(props.defaultOpen){
			setTimeout(()=>{
				Drawer.open()
			}, 100)
		}
		
		
		return () => {
			Drawer.setData({})
			newProps.exists = false
		}
	},[props.children, props.style, props.locked])
		
	
	return(null)
	//Doesn't render aything here, 
	//sends the props to System, which passes them to the SystemDrawerHandler to render outside the effect area
}

AppDrawer.propTypes = {
	style: PropTypes.object,
	locked: PropTypes.bool,
	defaultOpen: PropTypes.bool,
}