import React, {useState} from 'react'
import CustomToolbar from './CustomToolbar'
import {TouchPointApp, AppFooter} from './touchpoint-ui'
import DrawerContent from './DrawerContent'

//The modules in the moduleList and their icons
import LockScreen from './Modules/LockScreen/LockScreen'
import VendorRubrics from './Modules/VendorRubrics/VendorRubrics'
import VRIcon from './Modules/VendorRubrics/VRIcon.svg'
import ETDB from './Modules/ETDB/ETDB'

//This list of modules available to the app...
const moduleList = {
	LockScreen: {
		name: 'Home',
		component: LockScreen,
	},
	
	VendorRubrics: {
		name: 'Vendor Rubrics',
		component: VendorRubrics,
		icon: VRIcon,
		locked: false,
		hidden: false,
	},
	
	ETDB: {
		name: 'ETDB',
		component: ETDB,
		locked: false,
		hidden: false,
	},
}

export default function App() {
	
	const [activeUser, setActiveUser] = useState('FAHMYY')
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
	
	
	function saveSettings(id, token){
		localStorage.setItem('DMSsettings-'+id, token)
	}
	
	function getSettings(id){
		return localStorage.getItem('DMSsettings-'+id)
	}

	
	return (
		<TouchPointApp
			modules = {moduleList}
			homeModule = {'LockScreen'}
			io = {io}
			saveSettings = {saveSettings}
			getSettings = {getSettings}
		>
			
			<CustomToolbar />
			
			<AppFooter>
				<span className="leftSide">
					{io.getActiveUser()} |
					Security Profile: {io.getSecurityProfile()} |
					Version: {io.getVersion().number + ' - ' + io.getVersion().environment}
				</span>
			</AppFooter>
			
			<DrawerContent/>

			
		</TouchPointApp>
	)
}