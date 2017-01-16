import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

// add your YouTube API key here
const API_KEY = '';

class App extends Component {
  constructor(props) {
    super(props);

    this.selectNewVideo = this.selectNewVideo.bind(this);
    this.videoSearch = this.videoSearch.bind(this);

    this.state = {
      videos: [],
      selectedVideo: null
    };

    this.videoSearch('Nikon D810');
  }

  videoSearch(term) {
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    });
  }

  selectNewVideo(selectedVideo) {
    this.setState({selectedVideo})
  }

  render() {
    const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);

    return(
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={this.selectNewVideo}
          videos={this.state.videos}/>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('.container')
);
