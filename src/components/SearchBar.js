import React from 'react';
import '../App.css';

class SearchBar extends React.Component {

	state = { repo: '' }


	onChange = (event) => {
		this.setState({ repo: event.target.value });
	}

	onSubmit = (event) => {
		event.preventDefault();
		this.props.submitRepo(this.state.repo)
		this.setState({ repo: ''});
	}


	render() {
		return (
			<div className="search">
				<form onSubmit={this.onSubmit}>
					<input
						type="text"
						value={this.state.repo}
						onChange = {this.onChange}
					/>
				</form>
			</div>

			)
	}

}

export default SearchBar;