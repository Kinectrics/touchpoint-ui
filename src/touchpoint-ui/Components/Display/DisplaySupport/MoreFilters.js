import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus} from '@fortawesome/free-solid-svg-icons'

export default function MoreFilters(props) {
	return (
		<div>
			<button>
				<FontAwesomeIcon icon={faPlus} />
				<span style={{
					paddingLeft: '10px',
				}}>Equals</span>
			</button>
			
			<button>
				<FontAwesomeIcon icon={faPlus} />
				<span style={{
					paddingLeft: '10px',
				}}>Does Not Equal</span>
			</button>
			
			<button>
				<FontAwesomeIcon icon={faPlus} />
				<span style={{
					paddingLeft: '10px',
				}}>Includes</span>
			</button>
			
			<button>
				<FontAwesomeIcon icon={faPlus} />
				<span style={{
					paddingLeft: '10px',
				}}>Does Not Include</span>
			</button>
			
			
		</div>
	)
}
