import React, {useState} from 'react'
import MenuButton from '../MenuButton'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faWindowRestore, faCheck, faTimes} from '@fortawesome/free-solid-svg-icons'
import './SaveTableLayout.css'

export default function SaveTableLayout(props) {
	
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
			setSaveName('')
			props.headers.saveLayout(saveName)
		}
		
	}
	
	function keyDownHandler(e) {
		if (e.key === 'Enter') {
			commitHandler()
			e.target.blur()
		}
	}
	
	const savedLayouts = props.headers.getSavedLayouts()
	
	return (
		<MenuButton
			locked={false}
			onClose={() => setValidClass('')}
			menuStyle = {{minWidth:'200px'}}
			menuContent={
				<div className='SaveTableLayout'>

					<div className='inputMenu'>
						<span>Save Current Layout</span>
						<br />
						<input className={'input ' + validClass}
							value={saveName}
							onChange={changeHandler}
							onKeyDown={keyDownHandler}
						/>
						<span className="commitIcon" onClick={commitHandler}>
							<FontAwesomeIcon icon={faCheck} />
						</span>
					</div>


					{Object.keys(savedLayouts).map((f) => {
						return (
							<button
								className = {'layoutButton'}
								key = {'saveLayoutButton' + f}
								onClick={()=>props.headers.loadLayout(f)}
							>
								
								<span className='cancelIcon' onClick = {()=>{
									props.headers.deleteLayout(f)
								}}>
									<FontAwesomeIcon icon={faTimes}/>
								</span>
								
								{savedLayouts[f].name}
							</button>
						)
					})}


				</div>

			}>
				
			<span className=''>
				<FontAwesomeIcon icon={faWindowRestore} />
			</span> Saved Layouts
		</MenuButton>
	)
}