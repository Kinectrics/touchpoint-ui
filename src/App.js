import React, {useState} from 'react'
import {AppToolbar} from './touchpoint-ui'
import {AppFooter} from './touchpoint-ui'
import {TouchPointApp}from './touchpoint-ui'

//The modules in the moduleList and their icons
import LockScreen from './Modules/LockScreen/LockScreen'
import VendorRubrics from './Modules/VendorRubrics/VendorRubrics'
import VRIcon from './Modules/VendorRubrics/VRIcon.svg'

//This list of modules available to the app
const moduleList = {
	
	LockScreen: {
		name: 'Home',
		component: LockScreen,
	},
	
	VendorRubrics: {
		name: 'Vendor Rubrics',
		component: VendorRubrics,
		path: '/VendorRubrics',
		icon: VRIcon,
		locked: false,
		hidden: false,
	}
}

//The active user of the app. This will be requested from the server
//so I'm defining it out here so the request doen't happen on each render


export default function App() {
	
	const [activeUser] = useState('FAHMYY')
	const [securityProfile, setSecurityProfile] = useState(activeUser)
	
	//io Library for DMS-specific features. 
	const io = {
		getActiveUser: () => {return activeUser},
		
		getSecurityProfile: () => {return securityProfile},
		
		getVersion: () => {return {number: '0.1', environment: 'Development'}},
		
		getAvailableProfiles: () => {return(['FAHMYY', 'HIGHETJ', 'GORSKIO', 'DASS'])},
		
		setSecurityProfile: (profile) => {
			//some kind of check to test if the change is valid should go here
			setSecurityProfile(profile)
		},
	}
	
	return (
		<TouchPointApp
			modules = {moduleList}
			activeUser = {activeUser}
			homeModule = {'LockScreen'}
			io = {io}
		>
			
			<AppToolbar />
			<AppFooter/>
			
		</TouchPointApp>
	)
}