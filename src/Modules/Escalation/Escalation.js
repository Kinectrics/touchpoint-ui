import React, { useState } from "react";
import { Module, Dock, ControlBar, CoreButton, DockIcon, SplitScreen, FreeButton, useSystem, ControlledTabContainer, PopupCard, useDataset, MainTable, InfoTabContainer, InfoCard, InfoTab, MenuButton, AppToolbar, SearchBar } from '../../touchpoint-ui'
import { faCopy, faSave, faCogs, faTimesCircle, faPrint, faSync, faHome, faDatabase, faTasks, faHardHat, faFire } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddMenu from "./AddMenu";


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
		<Module>
			<Dock>
				<DockIcon menuContent={AddMenu} menuStyle ={{
					width: '900px',
				}}title ='Add Escalation'><FontAwesomeIcon icon={faDatabase}/></DockIcon>
			</Dock>
			
			<div>
				
			</div>
			
		</Module>
	);
}
