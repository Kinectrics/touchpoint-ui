TouchPoint UI Documentation

TouchPoint UI is a front end development framework built on top of React. It is designed for building modular, expandable apps. The idea is that any app wide functionality is implemented once, and maintained by the app developer, and others can develop modules that then run inside of the app. Module developers and app developers are able to work almost completely independently, giving module developers the freedom to customize their modules, while ensuring a consistent UI and user experience across the app (and across all TouchPoint apps).


Developing for TouchPoint UI: 
To work on TouchPont UI you can clone this repo and edit the src/touchpoint-ui package. 
Only code in this directory will actually be published. Anything else is for testing and development purposes.

To start the test app, use npm start. 
Once you are happy with the results, you can run 

	npm run build 

to compile it to the dist folder, and then 

	npm version [patch/minor/major]
	npm publish

to update the package. 

To use this package in a project, you can run 
	
	npm install --save touchpoint-ui
