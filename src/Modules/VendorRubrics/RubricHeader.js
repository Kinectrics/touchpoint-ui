import React from 'react'
import {InfoCard, Popup, FreeButton, CommentBox, TextBox} from '../../touchpoint-ui'
import './RubricHeader.css'
import ConfirmButton from '../../touchpoint-ui/Components/Inputs/ConfirmButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'


export default function RubricHeader(props) {
	
	function addSCRHandler(){
		props.system.Popup.open(<Popup title='Add SCR #' >
			Add SCR Popup coming soon
		</Popup>)
	}
	
	let scrList = props.activeRecord.scrList
	if(!scrList){scrList = []}
	
	return (
		<div className='RubricHeader'>
			
			<div className="largeContainer">
				
				<InfoCard height='450px' title = 'General'>
					
					<ConfirmButton
						content = {<FontAwesomeIcon icon={faTimes}/>}
						expandedContent = 'helloooo'
						onClick = {()=>{console.log('button')}}
					/>

					<table><tbody>
						<tr>
							<td><label>ID: </label></td>
							<td>{props.activeRecord.id}</td>
						</tr>
						
						<tr>
							<td><label>Project: </label></td>
							<td>{props.activeRecord.project}</td>
						</tr>
						
						<tr>
							<td><label>Project Name: </label></td>
							<td>{props.activeRecord.projectName}</td>
						</tr>
						
						<tr>
							<td><label>TOQ: </label></td>
							<td>{props.activeRecord.toq}</td>
						</tr>
						
						<tr>
							<td><label>Vendor Performance: </label></td>
							<td><CommentBox
								width={'900px'}
								height='150px'
								onEscape={()=>{
									console.log('hello')
								}}
							/></td>
						</tr>
					
					</tbody></table>
					
				</InfoCard>
				
			</div>
			
			<div className="smallContainer">
				
				<InfoCard height='250px' title = 'SCR'>					
					<FreeButton 
						wide
						onClick={addSCRHandler} 
						purpose='positive'
					>
						Add SCR #
					</FreeButton>
					<br/>
					<ul>
						
						{scrList.map((scr, idx) => {
							return(<li key={idx}><a target="_blank"
								href={'http://www.google.com/search?q='+scr}
							>{scr}</a></li>)
						})}
						
					</ul>
					
				</InfoCard>
				
				<InfoCard height='200px' title = 'Preparation and Approval'>
				<table><tbody>
					
						<tr>
							<td><label>Prepared By: </label></td>
							<td>{props.activeRecord.perparedBy}</td>
							
							<td><label>Prepared Date: </label></td>
							<td>{props.activeRecord.preparedDate}</td>
							
						</tr>
						
						<tr>
							<td><label>Approved By: </label></td>
							<td>{props.activeRecord.approvedBy}</td>
							<td><label>Approved Date: </label></td>
							<td>{props.activeRecord.approvedDate}</td>
						</tr>
						
					</tbody></table>
				</InfoCard>
				
			</div>
			
		</div>
	)
}
