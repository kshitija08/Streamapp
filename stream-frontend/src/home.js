import { Redirect } from 'react-router'
import Searchbar from "./searchbar"
import { Grid } from 'semantic-ui-react'
import { apikey, streamSocket } from "./config"
import Navbar from "./navbar"
import LeftMenu from "./left"
import { serverurl } from "./config"
var axios = require('axios');
var React = require('react')
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
    getUser = () => {
		let url = serverurl + '/streamapp/api/token';
		axios({
			method:'post',
			url:url,
			headers:{Authorization: "Token 142bbdddc6823fef1866c774eb078953c0f71949"},
			data: {
				key: "142bbdddc6823fef1866c774eb078953c0f71949",
			}
		}).then((response) => {
				console.log(response)
            })
            .catch((error) => {
				console.log(error.response)
            });
    }
	componentDidMount() {
		streamSocket.onmessage = (e) => {
			let data = JSON.parse(e.data);
		}
		this.getUser()
		// this.interval = setInterval(()=>{
		// 	var data = {
		// 		url: this.state.video,
		// 		play: this.player,
		// 		mute: '',
		// 		duration: '',
		// 		seek: '',
		// 		volume: '',
		// 		isStop: false

		// 	};
		// 	data.mute =this.player.isMuted();
		// 	data.duration =this.player.getDuration();
		// 	data.seek = this.player.getCurrentTime()
		// 	data.volume =this.player.getVolume();
		// 	if(this.player.getPlayerState() == 0 || this.player.getPlayerState() == -1 || this.player.getPlayerState() == 5){
		// 		data.isStop =true;
		// 		data.play =false;
		// 	}
		// 	else if(this.player.getPlayerState()== 2 || this.player.getPlayerState() == 3){
		// 		data.play = false;
		// 		data.isStop =false;
		// 	}
		// 	else if(this.player.getPlayerState()== 1){
		// 		data.play = true;
		// 		data.isStop =false;
		// 	}
		// 	streamSocket.send(JSON.stringify(data));

		// }, 1000);
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
				type: 'video',
				videoCategoryId: '10',
				order: 'viewCount'
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
		let data = {
			url: result.video,
			play: true,
			mute: false,
			duration: 0,
			seek: 0,
			volume: 70,
			isStop: false

		};
		streamSocket.send(JSON.stringify(data));
	}
	render() {
		if (this.state.token) {
			return (
				<Grid columns={3}>
					<Grid.Row columns={1} >
						<Grid.Column>
							<Navbar logout={this.logout} />
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column mobile={16} tablet={16} largeScreen={4}>
							<LeftMenu />
						</Grid.Column>
						<Grid.Column mobile={16} tablet={16} largeScreen={8}>
							<Searchbar isLoading={this.state.isLoading} searchbar={this.state.searchbar_value} results={this.state.results} handleChange={this.handleChange} handleResultSelect={this.handleResultSelect} resetComponent={this.resetComponent} />
							<Grid.Row columns={1}>
								<Grid.Column mobile={8} tablet={8} largeScreen={8}>
									<div id="player">
									</div>
								</Grid.Column>
							</Grid.Row>
						</Grid.Column>
						<Grid.Column mobile={16} tablet={16} largeScreen={4}>
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
		let data = {
			url: this.state.video,
			play: '',
			mute: '',
			isStop: '',
			duration: this.player.getDuration(),
			seek: '',
			volume: '',
		};
		switch (event.data) {
			case window['YT'].PlayerState.PLAYING:
				data.play = true;
				data.seek = this.player.getCurrentTime();
				data.isStop = false;
				break;
			case window['YT'].PlayerState.PAUSED:
				if (this.player.getDuration() - this.player.getCurrentTime() !== 0) {
					data.play = false;
					data.seek = this.player.getCurrentTime();
					data.isStop = false;
				};
				break;
			case window['YT'].PlayerState.ENDED:
				data.play = false;
				data.seek = this.player.getCurrentTime();
				data.isStop = true;
				break;
		};
		data.mute = this.player.isMuted();
		data.seek = this.player.getCurrentTime();
		data.volume = this.player.getVolume();
		streamSocket.send(JSON.stringify(data));
	};
	//utility
	cleanTime() {
		return Math.round(this.player.getCurrentTime())
	};
	onPlayerError(event) {
		switch (event.data) {
			case 2:
				break;
			case 100:
				break;
			case 101 || 150:
				break;
		};
	};
}

export default Home;