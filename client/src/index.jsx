import React from 'react';
import ReactDOM from 'react-dom';
import FollowButton from './components/FollowButton.jsx';
import $ from 'jquery';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: '5e321f038373796dfd05d97c',
      id: 101,
      handle: 'Englebert Humperdink',
      username: 'JimHendrix',
      photo: 'https://unsplash.it/120/120/?random',
      followers: 741,
      tracks: 4,
      join_date: "2013-11-04T06:22:26.644Z",
      isFollowed: false
    }
    this.handleAddFollowClick = this.handleAddFollowClick.bind(this);
    this.url = process.env.URL || 'http://localhost:4000';
  }

  handleAddFollowClick( ) {
    console.log('AddFollowButton was clicked');
    if (this.state.isFollowed === true) {
    this.setState({isFollowed: !this.state.isFollowed, followers: this.state.followers - 1});
    $.ajax({
      url: `${this.url}/decrementFollowers/${this.state.username}`,
      type: 'PATCH',
      success: (status) => {
        console.log('This is the status inside the succes of PATCH decrement request": ', status);
      },
      error: (error) => {
        console.log('This is the error from the PATCH decrement request: ', error);
      }
    });
  } else {
    this.setState({isFollowed: !this.state.isFollowed, followers: this.state.followers + 1 });
    $.ajax({
      url: `${this.url}/incrementFollowers/${this.state.username}`,
      type: 'PATCH',
      // data: { username: this.state.username },
      success: (status) => {
        console.log('This is the status inside the succes of PATCH increment request": ', status);
      },
      error: (error) => {
        console.log('This is the error from the PATCH increment request: ', error);
      }
    });
  }
  }

  componentDidMount(){
    $.ajax({
      url: `${this.url}/getUserById/101`,
      type: 'GET',
      success: (results) => {
        console.log('This is the result of /getUserById request: ', results);
        this.setState({
          _id: results._id,
          id: results.id,
          handle: results.handle,
          username: results.name,
          photo: results.image_url,
          followers: results.follower_count,
          tracks: results.track_count,
          join_date: results.join_date
        });
      },
      error: (error) => {
        console.log('This is the error from the /getUserById request: ', error);
      }
    });
  }


  render() {

    return (

      <div id="user_module" className="l-about-left user container">
        <div className="listenArtistInfo">
          <div className="user photo container">
            <img className="circle" src={this.state.photo} />
          </div>
          <div className="user_module_username_container">
            <div className="user_module_username">{this.state.username}</div>
          </div>
          <div className="user icon container">
            <span className="user_meta-data_container">
              <div className="user_followers_stats">
                <span className="user_follwers_icon">
                  <div className="user followers icon">
                    <span className="user_followers">
                      <i className="fad fa-user-friends"></i>
                    </span>
                  </div>
                  <div className="user followers">{this.state.followers}</div>
                </span>
              </div>
              <span className="user_tracks_container">
                <span className="user_tracks_icon">
                  <i className="fal fa-waveform tracks_icon"></i>
                </span>
                <span className="user tracks">{this.state.tracks}</span>
              </span>
            </span>
          </div>

          <FollowButton handleClick={this.handleAddFollowClick} isFollowed={this.state.isFollowed} />

          <div className="report_button_container">
            <span className="report_button_span">
              <a className="report_button_a">
                <span className="report_button_exclamation_icon">
                <i className="fas fa-diamond fa-lg"></i>
                <i className="fas fa-exclamation fa-xs" ></i>
                </span>
                <span className="report_text">Report</span></a>
            </span>
          </div>
        </div >
      </div >
    )
  }
}

ReactDOM.render(<User />, document.getElementById('app'));
