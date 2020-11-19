import React, { useState } from "react";
import { Module, Dock, ControlBar, CoreButton, DockIcon, SplitScreen, FreeButton, useSystem, ControlledTabContainer, PopupCard, useDataset, MainTable, InfoTabContainer, InfoCard, InfoTab, MenuButton, AppToolbar, SearchBar, TextBox, RefreshButton } from '../../touchpoint-ui'
import { faCopy, faSave, faCogs, faTimesCircle, faPrint, faSync, faHome, faDatabase, faTasks, faHardHat, faFire, faCircleNotch, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddMenu from "./AddMenu";
import './Escalation.css'
import {Loading}from '../../touchpoint-ui'
import {escalationQuery as getData} from '../../SQLSimulator'
import Nest from './Nest'


export default function Escalation() {
	
	function styler(cell, row) {
		const final = {
			backgroundColor: 'green',
			color: 'white'
		}

		const choices = {
			['Pending Approval']: { backgroundColor: 'orange', color: 'white' },
			['In Progress']: { backgroundColor: '#4d79ff', color: 'white' },
			['In-Progress']: { backgroundColor: '#4d79ff', color: 'white' },
			['Cancelled']: { backgroundColor: '#a6a6a6', color: 'white' },
			['Resolved']: { backgroundColor: '#009900', color: 'white' },
		}

		return choices[cell] ? choices[cell] : final
	}

	const headers = [
		{ headerID: "PK_ID", displayName: "ID", width: 100 },
		{ headerID: "Title", displayName: "Title", width: 220 },

		{
			headerID: "Status", displayName: "Status", styling: styler, width: 170, onEdit: async (e) => {
				if (e.cellValue.trim() === '') { return false }

				const response = await window.ipcRenderer.invoke('escalation-set-status', {
					escalationID: e.row.PK_ID,
					Name: 'Status',
					statusID: e.cellValue
				})

				if (response.success) {
					const newRow = { ...e.row }
					newRow.Status = response.body
					e.setRow(newRow)
				}

				return response.success
			}
		},

		{ headerID: 'ApprovalButton', displayName: '', width: 50},

		{ headerID: "LatestComment", displayName: "Latest Comment", width: 300 },
		{ headerID: "AddCommentButton", displayName: "", width: 50},
		{
			headerID: "ActionWith", displayName: "Action With", width: 170, onEdit: async (e) => {
				if (e.cellValue.trim() === '') { return false }

				const response = await window.ipcRenderer.invoke('escalation-update', {
					PK_ID: e.row.PK_ID,
					Name: 'ActionWith',
					ActionWith: e.cellValue
				})

				return response.success
			}
		},
		{
			headerID: "ActionDue", displayName: "Action Due", width: 170, type: 'date', onEdit: ()=>true},
		{
			headerID: "Type", displayName: "Escalation Type", width: 150, onEdit: async (e) => {
				if (e.cellValue.trim() === '') { return false }

				const response = await window.ipcRenderer.invoke('escalation-update', {
					PK_ID: e.row.PK_ID,
					Name: 'Type',
					Type: e.cellValue
				})

				return response.success
			}
		},
		{
			headerID: "Program", displayName: "Program", width: 150, onEdit: async (e) => {
				if (e.cellValue.trim() === '') { return false }

				const response = await window.ipcRenderer.invoke('escalation-update', {
					PK_ID: e.row.PK_ID,
					Name: 'Program',
					Program: e.cellValue
				})

				return response.success
			}
		},
		{ headerID: "RaisedBy", displayName: "Raised By", width: 150 },
		{ headerID: "CreatedDate", displayName: "Created Date", width: 150, type: "date" },
	]
	
	
	
	const dataset = useDataset(getData, {primaryKey: 'PK_ID'})

	return (
		
		<Module moduleName='Escalation'>
			
			<ControlBar searchBar>
				<RefreshButton data={dataset}/>
			</ControlBar>
			
			<MainTable
				style={{ height: 'calc(100% - var(--controlBarHeight))' }}
				pageSize={60}
				headers={headers}
				data={dataset}
				searchable
				settingsID='Escalations-Table-All'
				nestedComponent={Nest}
				noActive
			/>
			
		</Module>
	);
}