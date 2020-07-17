import React from 'react';
import RubricCard from './RubricCard';
import './RubricDetail.css';

export default function RubricDetail() {

	const categories = [
		{
			name: "Scope Control",
			data: [
				{
					name: "scope1",
					scope: ["N/A", "Did not clearly understand scope", "Scope not fully executed", "Scope executed according to requirements", "Scope executed to written"]
				},
				{
					name: "scope2",
					scope: ["N/A", "Multiple scope change requests", "Multiple iterations on scope documents", "One scope change request only", "Identified project scope issues outside of their own work"]
				},
				{
					name: "scope3",
					scope: ["N/A", "Scope changes requests to late for corrective actions to meet commitments", "Multiple timely scope change requests", "Rapid escalation of scope issues", "Technical innovation resulted in substantial savings"]
				},
				{
					name: "scope4",
					scope: ["N/A", "Unaware of stakeholder scope changes", "Allows stakeholders to modify scope without approval", "Management of stakeholders so that scope change not required", "Proactive stakeholder management resulted in scope reduction"]
				}
			]
		},
		{
			name: "Cost",
			data: [
				{
					name: "cost1",
					scope: ["N/A", "Ignored safety concerns", "Did not identify safety concerns", "Identified and proactively managed safety concerns", "Leadership identifies safety concerns in field not within their own team"]
				},
				{
					name: "cost2",
					scope: ["N/A", "Ignored safety rules", "Did not follow safety rules", "Met safety rules", "Exceeds safety rules"]
				}
			]
		}
	];

	return (
		<div className="RubricDetail">
			<div className="largeContainer">
				{categories.map(c => {
					return <RubricCard categories={c.data} cardTitle={c.name} />
				}
				)}
				
			</div>
		</div>
		
	)
}