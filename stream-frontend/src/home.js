import { Redirect } from 'react-router'
import Searchbar from "./searchbar"
import { Grid } from 'semantic-ui-react'
import { apikey } from "./config"
var React = require('react')
var axios = require('axios')
class Logout extends React.Component {
	render() {
		return (
			<button onClick={this.props.logout}>Logout</button>
		)
	}
}
class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			token: localStorage.token,
			searchbar_value: '',
			results: [],
			objects: [],
			video: '',
		};
		this.init();
		window['onYouTubeIframeAPIReady'] = (e) => {
			this.YT = window['YT'];
			this.player = new window['YT'].Player('player', {
				height: '390',
				width: '640',
				videoId: this.state.video,
				autoplay: 1,
				enablejsapi: 1,
				events: {
					'onStateChange': this.onPlayerStateChange.bind(this),
					'onError': this.onPlayerError.bind(this),
				}
			});
		};
	}
	logout = () => {
		delete localStorage.token
		this.setState({ token: localStorage.token });
	}
	handleChange = (event) => {
		this.setState({ isLoading: true })
		event.preventDefault();
		this.setState({ 'searchbar_value': event.target.value });
		let MAX_RESULTS = 3;
		axios.get('https://www.googleapis.com/youtube/v3/search', {
			params: {
				part: 'snippet',
				key: apikey,
				q: this.state.searchbar_value,
				maxResults: MAX_RESULTS,
			}
		})
			.then((response) => {
				this.setState({
					objects: response.data.items,
				});
				let new_res = this.state.objects.map((element) => {
					let new_element = {
						'title': '',
						'description': '',
						'image': '',
						'video-id': ''
					}
					new_element.title = element.snippet.title
					new_element.description = element.snippet.description
					new_element.image = element.snippet.thumbnails.high.url
					new_element.price = element.snippet.channelTitle
					new_element.video = element.id.videoId
					return new_element
				})
				this.setState({
					results: new_res,
					isLoading: false,
				});
			})
			.catch(function (error) {
				console.log(error);
			});
	}
	resetComponent = () => this.setState({ isLoading: false, results: [], searchbar: '' })
	handleResultSelect = (e, { result }) => {
		this.setState({
			video: result.video,
			searchbar_value: result.title

		})
		this.player.loadVideoById(result.video,
			0,
			'small')
	}
	render() {
		if (this.state.token) {
			return (
				<Grid columns={3} divided>
					<Grid.Row columns={1} >
						<Grid.Column>
							<Logout logout={this.logout} />
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column mobile={16} tablet={16} largeScreen={4}>
						</Grid.Column>
						<Grid.Column mobile={16} tablet={16} largeScreen={12}>
							<Searchbar isLoading={this.state.isLoading} searchbar={this.state.searchbar_value} results={this.state.results} handleChange={this.handleChange} handleResultSelect={this.handleResultSelect} resetComponent={this.resetComponent} />
							<Grid.Row columns={2}>
								<Grid.Column mobile={8} tablet={8} largeScreen={8}>
									<div id="player">
									</div>
								</Grid.Column>
							</Grid.Row>

						</Grid.Column>


					</Grid.Row>
				</Grid>

			)
		}
		else {
			return (
				<Redirect to='/login' />
			)
		}
	}
	init() {
		var tag = document.createElement('script');
		tag.src = 'https://www.youtube.com/iframe_api';
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	}
	onPlayerStateChange(event) {
		console.log(event)
		switch (event.data) {
			case window['YT'].PlayerState.PLAYING:
				if (this.cleanTime() === 0) {
					console.log('started ' + this.cleanTime());
				} else {
					console.log('playing ' + this.cleanTime())
				};
				break;
			case window['YT'].PlayerState.PAUSED:
				if (this.player.getDuration() - this.player.getCurrentTime() !== 0) {
					console.log('paused' + ' @ ' + this.cleanTime());
				};
				break;
			case window['YT'].PlayerState.ENDED:
				console.log('ended ');
				break;
		};
	};
	//utility
	cleanTime() {
		return Math.round(this.player.getCurrentTime())
	};
	onPlayerError(event) {
		switch (event.data) {
			case 2:
				console.log('' + this.state.video)
				break;
			case 100:
				break;
			case 101 || 150:
				break;
		};
	};
}

export default Home;