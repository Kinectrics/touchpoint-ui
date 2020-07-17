import React from 'react';
import {RadioGroup, RadioButton, InfoCard} from '../../touchpoint-ui';

export default function RubricCard(props) {

	function mapRadio() {

		return (

			props.categories.map((x, idx) => {
				return (
					<RadioGroup
						groupName={x.name}
						onChange={(value) => { console.log(value) }}
						key={idx}
					>
						<tr>
							
							{x.scope.map((s, idx) => {
								return (
									<td key={idx}><RadioButton radioKey={idx} labelValue={s} value={idx * 25} /></td>
								)
							}
							)}
						</tr>

					</RadioGroup>
				)
			})
		)


	}

	return (
		<InfoCard title={props.cardTitle}>
			<table className="table table-striped">
				<thead>
					<tr>
						<th scope="col">NA</th>
						<th scope="col">1. Needs Significant Development</th>
						<th scope="col">2. Needs Development</th>
						<th scope="col">3. Meets Standards</th>
						<th scope="col">4. Exceeds Expectation</th>
					</tr>
				</thead>
				<tbody>
					{mapRadio()}
				</tbody>
			</table>
			<div className="calculatedTotals"></div>
		</InfoCard>
	)
}