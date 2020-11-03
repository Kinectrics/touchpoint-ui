import {useRef, useEffect} from 'react'

export default function useShortcuts(shortcuts){
	
	const keymap = useRef({})
	
	function keyHandler(e){
		let code = ''
		
		if(e.ctrlKey || e.metaKey){code = code + 'ctrl'}
		if(e.shiftKey){code = code + 'shift'}
		if(e.altKey){code = code + 'alt'}
		code = code + e.key.toString().toLowerCase()
		
		if (shortcuts.current[code]){
			shortcuts[code](e)
		}
	}
	
	useEffect(()=>{
		if(Object.keys(shortcuts).length){document.addEventListener('keydown', keyHandler)}
		return ()=>document.removeEventListener('keydown', keyHandler)
	},[])
}