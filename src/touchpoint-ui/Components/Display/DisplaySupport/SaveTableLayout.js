import React, {useState} from 'react'
import MenuButton from '../MenuButton'
import useSystem from '../../../Hooks/UseSystem'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faWindowRestore, faCheck} from '@fortawesome/free-solid-svg-icons'
import './SaveTableLayout.css'

export default function SaveTableLayout(props) {
	const System = useSystem()
	
	const [saveName, setSaveName] = useState('')
	const [validClass, setValidClass] = useState('')
	
	function changeHandler(e){
		setSaveName(e.target.value)
		setValidClass('')
	}
	
	function commitHandler(){
		
		if(saveName.trim() === ''){
			setValidClass('invalid')
		} else{
			console.log(saveName)
			setSaveName('')
		}
		
	}
	
	function keyDownHandler(e) {
		if (e.key === 'Enter') {
			commitHandler()
			e.target.blur()
		}
	}
	
	return (
		<MenuButton locked={false} onClose = {()=>setValidClass('')} menuContent={
			<div className = 'SaveTableLayout'>
				
				<div className = 'inputMenu'>
					<span>Save Current Layout</span>
					<br/>
					<input className = {'input '+ validClass}
						value = {saveName}
						onChange = {changeHandler}
						onKeyDown = {keyDownHandler}
					/>
					<span className="commitIcon" onClick = {commitHandler}>
						<FontAwesomeIcon icon={faCheck} />
					</span>
				</div>
				

				<button>Outstanding Tasks</button>
				<button>Assigned To Me</button>
				<button>Due Soon</button>
				
			</div>
			
		}>
			<span className=''>
				<FontAwesomeIcon icon={faWindowRestore} />
			</span> Saved Layouts
		</MenuButton>
	)
}