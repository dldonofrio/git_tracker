import React from 'react';
import '../App.css';
const ReleaseNotes = ({repo}) => {

		if(!repo) {
			return <div></div>
		}

		return (
			<div className="detail-container"> 
				<span>{repo.release.name}</span>
				<br />
				<span>{repo.release.notes}</span>
			</div>
			)

}


export default ReleaseNotes;