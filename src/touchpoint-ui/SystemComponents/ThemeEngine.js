export default class ThemeEngine{
	
	constructor(){
		//The list of available themes.
		this.themes = {
			orange: {
				/* Main Table */
				tableActiveColor: 'rgb(221, 70, 0)',
				
				/* Text */
				mainTextColor: 'rgb(26, 26, 26)',
				labelColor: 'var(--navColor)',
				lockedTextColor: 'rgb(122, 122, 122)',
				
				/* Nav */
				navColor: 'rgb(211, 67, 0)',
				navTextColor: 'white',
				navHoverColor: 'rgb(196, 196, 196)',
				navClickedColor: 'rgb(177, 177, 177)',
				
				/* Body Background */
				bodyAltBG: 'rgb(224, 230, 245)',
				
				/* Cards */
				cardBG: 'white',
				borderColor: 'rgba(211, 211, 211, 0.705)',
				
				/* FreeButtons */
				freeButtonNeutralBG: 'var(--labelColor)',
				freeButtonPositiveBG: 'rgb(0, 138, 230)',
				freeButtonNegativeBG: 'rgb(211, 67, 0)',
				freeButtonTextColor: 'white',
				
				/* Inputs */
				inputColor: 'rgb(238, 238, 238)',
				inputInvalidColor: 'rgb(236, 171, 171)',
				inputValidColor: 'rgb(153, 238, 153)',
			},
			
			blue: {
				/* Main Table */
				tableActiveColor: 'rgb(2, 187, 219)',
				
				/* Text */
				mainTextColor: 'rgb(26, 26, 26)',
				labelColor: 'var(--navColor)',
				lockedTextColor: 'rgb(122, 122, 122)',
				
				/* Nav */
				navColor: 'rgb(0, 138, 230)',
				navTextColor: 'white',
				navHoverColor: 'rgb(196, 196, 196)',
				navClickedColor: 'rgb(177, 177, 177)',
				
				/* Body Background */
				bodyAltBG: 'rgb(224, 230, 245)',
				
				/* Cards */
				cardBG: 'white',
				borderColor: 'rgba(211, 211, 211, 0.705)',
				
				/* FreeButtons */
				freeButtonNeutralBG: 'var(--labelColor)',
				freeButtonPositiveBG: 'green',
				freeButtonNegativeBG: 'red',
				freeButtonTextColor: 'white',
				
				/* Inputs */
				inputColor: 'rgb(245, 245, 245)',
				inputInvalidColor: 'rgb(236, 171, 171)',
				inputValidColor: 'rgb(153, 238, 153)',
			},
			
			dark: {
				/* Main Table */
				tableActiveColor: '#63A1FF',
				
				/* Text */
				mainTextColor: 'rgb(211, 211, 211)',
				labelColor: '#63A1FF',
				lockedTextColor: 'rgb(122, 122, 122)',
				
				/* Nav */
				navColor: '#35363A',
				navTextColor: 'rgb(211, 211, 211)',
				navHoverColor: 'rgb(196, 196, 196)',
				navClickedColor: 'rgb(177, 177, 177)',
				
				/* Body Background */
				bodyAltBG: '#222229',
				
				/* Cards */
				cardBG: '#313440',
				borderColor: 'rgba(211, 211, 211, 0.158)',
				
				/* FreeButtons */
				freeButtonNeutralBG: 'var(--labelColor)',
				freeButtonPositiveBG: 'green',
				freeButtonNegativeBG: 'red',
				freeButtonTextColor: 'white',
				
				/* Inputs */
				inputColor: '#202124',
				inputInvalidColor: 'rgb(134, 67, 67)',
				inputValidColor: 'rgb(45, 104, 45)',
			},
		}
	}
	
	//Set the CSS cariables that control theme colors
	setTheme(themeName){
		//check if a theme exists with that name 
		if(this.themes[themeName]){
			
			const themeData = this.themes[themeName.toLowerCase()]
			
			Object.entries(themeData).forEach(([key, value]) => {
				document.documentElement.style.setProperty('--' + key, value)
			})
			
			localStorage.setItem('themeName',themeName)
		}
	}
	
	//fethches the user's preferred theme and applies it
	getUserTheme(){
		this.setTheme(localStorage.getItem('themeName'))
	}
}
