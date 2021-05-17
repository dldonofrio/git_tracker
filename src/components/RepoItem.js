import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';

const RepoItem = ({repo, onRepoSelect, deleteRepo, onUpdateView	}) => {
	var newRepoUpdate;
	if(repo.isNew) {
		newRepoUpdate = <div className="repo-new" onClick={() => onUpdateView(repo)}>New!</div>
	} else {
		newRepoUpdate = <span></span>
	}


		return (
			<div className="list-item">
					<div className="repo-name" onClick={() => onRepoSelect(repo)}>{repo.name}</div>
					<div className="repo-owner">{repo.owner}</div>
					<div className="repo-version">{repo.release.version}</div>
					{newRepoUpdate}
					<button className="repo-button" onClick={deleteRepo.bind(this, repo.id)} > x</button>	
			</div>
		)

	
}

// RepoItem.propTypes = {
// 	repos: PropTypes.array.isRequired
// }
export default RepoItem;