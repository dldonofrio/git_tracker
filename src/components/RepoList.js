import React from 'react';
import RepoItem from './RepoItem';
import '../App.css';

const RepoList = (props) => {
	const mappedList = 	props.repos.map((repo) => {
		return (
				<RepoItem 
					onRepoSelect={props.onRepoSelect}
					key={repo.id} 
					repo={repo}
					isNew={props.isNew}
					deleteRepo={props.deleteRepo}
					onUpdateView={props.onUpdateView}
				/>
			)
	});

	return <div>{mappedList}</div>;
}
		

export default RepoList;