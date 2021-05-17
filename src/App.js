
import React from 'react';
import SearchBar from './components/SearchBar';
import RepoList from './components/RepoList';
import logo from './logo.svg';
import github from './api/github';
import ReleaseNotes from './components/ReleaseNotes';
import Localbase from 'localbase';
import './App.css';

let db = new Localbase('db');

class App extends React.Component {

		state = {
				repos: [],
				selectedRepo: null
		};

	dbAdd = (repo) => {
			db.collection('repos_TEST2').add(repo);
	}

	dbUpdate = async (repo) => {
			db.collection('repos_TEST')
					.doc({ id: repo.id })
					.update({
					})
	}

	dbDelete = (id) => {
			db.collection('repos_TEST2').doc({ id: id }).delete();
	}
	async componentDidMount() {
		const repos = await db.collection('repos_TEST2').get()
		const versionCheck = await Promise.all(repos.map( async (repo) => {
					const newVersion = await this.getRelease(repo);
					const newRel = newVersion.release.id;
					const oldRel = repo.release.id;
					if(newRel > oldRel) {
						newVersion.isNew = true;
						return newVersion;	
					} else {
							return repo;
							
					}
				}))
					await this.setState({ repos: versionCheck	 	})
				
	}

	findRepo = async (name) => {
		const response = await github.get('/search/repositories', {
				params: {
					q: name,
					page: 1,
					per_page: 1
				}
		});

		const repo = {
			id: response.data.items[0].id,
			name: name,
			owner: response.data.items[0].owner.login,
			isNew: false
		}
		return repo;
	}

	getRelease = async (repo) => {
		const response = await github.get('/repos/' + repo.owner + "/" + repo.name + "/releases", {
			params: {
				page: 1,
				per_page: 1
			}
		})
		repo.release = {
			id: response.data[0].id,
			version: response.data[0].tag_name,
			name: response.data[0].name,
			notes: response.data[0].body
		}
		return repo;
	}


	addRepo = async (name ) => {
		const findRepo = await this.findRepo(name);
		const getRelease = await this.getRelease(findRepo);
		this.dbAdd(getRelease);
		this.setState(
			{
				repos: [...this.state.repos, getRelease]
			})
	};

	onRepoSelect = async (repo) => {
		this.setState({ 
			selectedRepo: repo
		})
	}

	onUpdateView	= async (repo) => {
			const updateRepo = await db.collection('repos_TEST2')
					.doc({ id: repo.id })
					.update({
							isNew: false
					})
			const repos = await db.collection('repos_TEST2').get()
			this.setState({ repos: repos })
	}

	deleteRepo = (id) => {
		var repoId = {
			id: id
		}
		this.dbDelete(id);
		this.setState({
			repos: [...this.state.repos.filter(repo =>
				repo.id !== id)]
			})

		}

		render() {
				return (
								<div className="grid-container">
										<div className="list-container">
												<SearchBar submitRepo = {this.addRepo} />
												<RepoList repos={this.state.repos}  deleteRepo={this.deleteRepo} onRepoSelect={this.onRepoSelect} onUpdateView={this.onUpdateView	} />
										</div>
										<ReleaseNotes className="detail-container" repo={this.state.selectedRepo} />
								</div>
						)
		}
}

export default App;
