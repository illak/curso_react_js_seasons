import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

class App extends Component {
	state = { lat: null, errorMessage: '' };

	componentDidMount() {
		window.navigator.geolocation.getCurrentPosition(
			position => this.setState({ lat: position.coords.latitude }),
			error => this.setState({ errorMessage: error.message })
		);
	}

	componentDidUpdate(prevProps, prevState) {
		console.log('Component was just updated - rerendered!');
	}

	renderContent() {
		return !this.state.errorMessage ? (
			<div>
				{this.state.lat ? (
					<SeasonDisplay lat={this.state.lat} />
				) : (
					<Spinner message={'Please accept location request'} />
				)}
			</div>
		) : (
			<div>Error: {this.state.errorMessage}</div>
		);
	}

	render() {
		// Example! border red doesn't exists in css
		return <div className='border red'>{this.renderContent()}</div>;
	}
}

ReactDOM.render(<App />, document.querySelector('#root'));
