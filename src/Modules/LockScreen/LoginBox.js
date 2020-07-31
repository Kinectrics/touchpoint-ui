import React from 'react'
import {InfoCard, ComboBox} from '../../touchpoint-ui'

export default function LoginBox(props) {
	
	//Handles the security profile dropdown menu change event
	function changeHandler(e){
		props.system.io.setSecurityProfile(e.target.value)
	}
	
	return (
		
		<div className="LoginBox">
			<InfoCard
				stripe
			>
				
				<label><b> Signed in as </b></label>
				{props.system.io.getActiveUser()}
				<br/>
				<br/>
				<label><b>Use Security Profile </b></label>
				
				<ComboBox 
					defaultValue={props.system.io.getActiveUser()}
					onChange={changeHandler}
				>
					
					{props.system.io.getAvailableProfiles().map((pr,idx)=>{
						return(<option key = {idx} value={pr}>{pr}</option>)
					})}
					
				</ComboBox>
			</InfoCard>
		</div>
		
	)
}
