import React, { useState } from "react";
import { Module, Dock, ControlBar, CoreButton, DockIcon, SplitScreen, FreeButton, useSystem, ControlledTabContainer, PopupCard, useDataset, MainTable, InfoTabContainer, InfoCard, InfoTab, MenuButton, AppToolbar, SearchBar, TextBox } from '../../touchpoint-ui'
import { faCopy, faSave, faCogs, faTimesCircle, faPrint, faSync, faHome, faDatabase, faTasks, faHardHat, faFire, faCircleNotch, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddMenu from "./AddMenu";
import './Escalation.css'
import {Loading}from '../../touchpoint-ui'


export default function Escalation() {

	const headers = [
		{ headerID: "Title", displayName: "Title", width: 120 },
		{ headerID: "Status", displayName: "Status", width: 120 },
		{ headerID: "RaisedBy", displayName: "Raised By", width: 200 },
		{ headerID: "CreatedDate", displayName: "Created Date", width: 200, type: "date", },
		{ headerID: "ActionWith", displayName: "Action With", width: 200 },
		{ headerID: "ActionDue", displayName: "Action Due", width: 200 },
	];

	return (
		<Module moduleName='Escalation'>
			<Dock>
				<DockIcon menuContent={AddMenu} menuStyle ={{
					width: '900px',
				}}title ='Add Escalation'><FontAwesomeIcon icon={faDatabase}/></DockIcon>
			</Dock>
			
			<Loading>
				{/* <FontAwesomeIcon icon={faSync}/> */}
			</Loading>
			
			
		</Module>
	);
}
