import { useRef } from 'react'
import {useEffect} from 'react'

export default function useShortcuts(shortcuts){
	
	const keymap = useRef({})
	
	function keyHandler(e){
		let code = ''
		
		if(e.ctrlKey || e.metaKey){code = code + 'ctrl'}
		if(e.shiftKey){code = code + 'shift'}
		if(e.altKey){code = code + 'alt'}
		code = code + e.key.toString().toLowerCase()
		
		if(keymap.current[code]){
			keymap.current[code]()
		}
	}
	
	useEffect(()=>{
		
		shortcuts.map(e=>{
			let code = ''
			if(e.ctrl || e.metaKey){ code = code + 'ctrl' }
			if(e.shift){ code = code + 'shift' }
			if(e.alt){ code = code + 'alt' }
			code = code + e.key.toString().toLowerCase()
			
			keymap.current[code] = e.callback
		})
		
		document.addEventListener('keydown', keyHandler)
		return ()=>document.addEventListener('keydown', keyHandler)
	},[])
}