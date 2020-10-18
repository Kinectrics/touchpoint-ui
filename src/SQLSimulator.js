import faker from 'faker'
import escalationData from './escalationData.json'


//returns a lis of pending actions actions for a given user in a given module
export function queryNotifications(){
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
	])
}

function createState() {
	const stateOptions = ['At Risk', 'On Track', 'CSVN Required', 'CSVN Approved', 'CSVN In Progress', 'Not Required']
	const idx = Math.floor(Math.random() * (stateOptions.length))
	return (stateOptions[idx])
}


export function csqQuery(){
	const list = []
	const n = 500

	for (let i = 0; i < n; i++) {
		const row = {
			id: i,
			commitment: faker.date.future().toString(),
			finish: faker.date.future().toString(),
			pcs: faker.name.findName(),
			pm: faker.name.findName(),
			planner: faker.name.findName(),
			programManager: faker.name.findName(),
			materialBuyer: faker.name.findName(),
			serviceBuyer: faker.name.findName(),
			materialBuyer: faker.name.findName(),
			buyerAnalyst: faker.name.findName(),
			csq: Math.random() > 0.8 ? 'CSQ' : 'NCSQ',
			lamp: Math.random() < 0.4 ? 'Yes' : 'No',
			notes: faker.lorem.sentence(),
			csvnDate: faker.date.future().toString(),
			state: createState()
		}

		row.variance = 7
		list.push(row)
	}
	
	// return JSON.parse(JSON.stringify(list))
	
	return new Promise((resolve)=>{
		setTimeout(resolve(list),1000)
	})
}

//
export function fakeData(n = 500){
	
	const data = []
	const statuses = ['Complete', 'In Progress', 'Pending Approval']
	
	for (let i = 0; i < n; i++) {
		
		data.push({
			id: i,
			vendor: i%2 === 0 ? 'Vendor' : 'Other',
			project: faker.random.number(40000),
			SM: faker.name.findName(),
			projectName: faker.company.catchPhrase(),
			status: statuses[i % 3],
			due: faker.date.future(),
			intern: faker.name.findName(),
			toq: faker.random.number(7000000),
			perparedBy: faker.name.findName(),
			approvedBy: faker.name.findName(),
			preparedDate: faker.date.past(),
			approvedDate: faker.date.past(),
			
			scrList: [...new Array(2 + i% 7)].map(()=>faker.random.number(2000000)),
			
			statusLog: [...new Array(2 + i % 7)].map((ad, idx) => {return {
				date: faker.date.past(),
				notes: faker.lorem.sentence(),
				status: statuses[(i+idx) % 3],
			}}),
		})
	}
	
	
	// return JSON.parse(JSON.stringify(data))
	
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(JSON.parse(JSON.stringify(data)))
		}, 0)
	})
}


export function escalationQuery(){
	return new Promise((resolve=>{
		setTimeout(()=>resolve(escalationData.body), 200)
	}))
		
}