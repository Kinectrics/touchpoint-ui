//returns a lis of pending actions actions for a given user in a given module
export function queryNotifications(userName, moduleName){
	return([
		{title: 'Support', action: 'Pending Approval', due: Date('10-May-20'), moduleName : 'Vendor Rubrics', moduleID:'VendorRubrics'},
		{title: 'Vendor Rubric 2', action: 'Pending Review', due: Date('1-May-20'), moduleName : 'Vendor Rubrics', moduleID:'VendorRubrics'},
		{title: 'New Vendor Review', action: 'Approval Required', due: Date('1-May-20'), moduleName : 'Vendor Rubrics', moduleID:'VendorRubrics'},
		{title: 'Vendor Review', action: 'Approval Required', due: Date('1-Jun-20'), moduleName : 'Vendor Rubrics', moduleID:'VendorRubrics'},
		{title: 'Vendor Rubric 2', action: 'Pending Review', due: Date('1-May-20'), moduleName : 'Vendor Rubrics', moduleID:'VendorRubrics'},
		{title: 'New Vendor Review', action: 'Approval Required', due: Date('1-May-20'), moduleName : 'Vendor Rubrics', moduleID:'VendorRubrics'},
		{title: 'Vendor Review', action: 'Approval Required', due: Date('1-Jun-20'), moduleName : 'Vendor Rubrics', moduleID:'VendorRubrics'},
		{title: 'Vendor Rubric 2', action: 'Pending Review', due: Date('1-May-20'), moduleName : 'Vendor Rubrics', moduleID:'VendorRubrics'},
		{title: 'New Vendor Review', action: 'Approval Required', due: Date('1-May-20'), moduleName : 'Vendor Rubrics', moduleID:'VendorRubrics'},
		{title: 'Vendor Review', action: 'Approval Required', due: Date('1-Jun-20'), moduleName : 'Vendor Rubrics', moduleID:'VendorRubrics'},
	]);
}


//returns dummy query results for the vendorRubrics table 
export function getTableData(){
	const data = []
	
	const vendors = ['Vendor 1', 'Vendor 2','Service','','']
	const SMs = ['Sid Das', 'Olivia Krucko Gorski','Rushanth Raveendran']
	const projectNames = ['Cooling Things and such', '','Radiation protection etc.']
	const statuses = ['Complete', '','Open']
	const dues = ['1-May-20', '','1-Jan-20']
	const interns = ['Youssof Fahmy', 'Andrew Wuebbolt','Clara Birch']
	const project = [36527,39568,38735,36815,39202,39548]
	const scr = [
		[99876,88767, 5909873, 776378, 88282,747224,4289042,27427924],[99383,88393],[83729],[99557]
	] 
	
	const statusLog = [
		[
			{date: '1-Jan-20', status: 'Open', changedBy: 'Youssof Fahmy', notes: 'Added new TOQ'},
			{date: '3-Jan-20', status: 'Pending', changedBy: 'Youssof Fahmy', notes: 'Need response ASAP'},
			{date: '10-Jan-20', status: 'Complete', changedBy: 'Andew Wuebbolt', notes: 'Vendor Selected'},
		],
		[
			{date: '1-Jan-20', status: 'Pending', changedBy: 'Youssof Fahmy', notes: 'Added new TOQ'},
			{date: '3-Jan-20', status: 'Pending', changedBy: 'Youssof Fahmy', notes: 'Need response ASAP'},
			{date: '10-Jan-20', status: 'Complete', changedBy: 'Andew Wuebbolt', notes: 'Vendor Selected'},
		],
		[
			{date: '1-Jan-20', status: 'Open', changedBy: 'Youssof Fahmy', notes: 'Added new TOQ'},
			{date: '3-Jan-20', status: 'Open', changedBy: 'Sid Das', notes: 'Need response ASAP'},
			{date: '10-Jan-20', status: 'Pending', changedBy: 'Andew Wuebbolt', notes: 'Vendor Selected'},
		]
	]
	
	const preparedBy = ['Clara Birch', 'Tyler Campbell', 'Youssof Fahmy']
	
	for(let i = 0; i<1000; i++){
		data.push({
			vendor: vendors[i % 4], 
			project: project[i % 5], 
			SM: SMs[i % 2],
			projectName: projectNames[i % 2],
			status: statuses[i % 3],
			due: dues[i % 3],
			intern: interns[i % 3],
			id: i+1 + Math.round(Math.random()*10),
			toq: Math.floor(Math.sqrt(i * 277 +1739))  + i*100,
			statusLog: statusLog[i % 3],
			perparedBy: preparedBy[i % 3],
			approvedBy: preparedBy[i % 2],
			preparedDate: '1-Jan-20',
			approvedDate: '1-May-20',
			scrList: scr[i % 4],
		})
	}
	
	return(data)
	
}