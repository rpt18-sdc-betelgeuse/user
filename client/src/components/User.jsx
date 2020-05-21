import React from 'react';
import FollowButton from './FollowButton.jsx';
import $ from 'jquery';
import styled from 'styled-components';
import Report from './Report.jsx';
import MetaData from './MetaData.jsx';

const StyledImg = styled.img`
  border-radius: 50%;
  cursor: pointer;
`;
const StyledContainer = styled.div`
  font-family: InterstateSound Tnum,Interstate,Lucida Grande,Lucida   Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;
  font-weight: 100;
  font-size: 14px;
  cursor: pointer;
`;
const StyledUser = styled.div`
  color: #333;
  margin-bottom: 10px;
  margin-left: 5px;
  font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;
`;


class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: '5e321f038373796dfd05d97c',
      id: 101,
      handle: 'Englebert Humperdink',
      username: /*'Johnson Paucek IV',*/'JimHendrix',
      photo: 'https://unsplash.it/120/120/?random',
      followers: 741,
      tracks: 4,
      join_date: "2013-11-04T06:22:26.644Z",
      isFollowed: false
    }
    this.handleAddFollowClick = this.handleAddFollowClick.bind(this);
    this.url = 'http://34.212.22.167';/*'http://54.219.157.13:4001';*/
    this.masterId = location.href.substring(location.href.lastIndexOf('/') + 1) || 8
    console.log('this.url : ', this.url, 'and this.masterId : ', this.masterId, 'and this is how this thing resolves location.href.substring(location.href.lastIndexOf(\'/\') + 1): ', location.href.substring(location.href.lastIndexOf('/') + 1 ));
    //cheese
  }

  handleAddFollowClick( ) {
    if (this.state.isFollowed === true) {
      this.setState({isFollowed: !this.state.isFollowed, followers: this.state.followers - 1});
      $.ajax({
        url: `${this.url}/decrementFollowers/${this.state.username}`,
        type: 'PATCH'
      });
    } else {
      this.setState({isFollowed: !this.state.isFollowed, followers: this.state.followers + 1 });
      $.ajax({
        url: `${this.url}/incrementFollowers/${this.state.username}`,
        type: 'PATCH'
      });
    }
  }

  componentDidMount(){
    $.ajax({
      url: `${this.url}/getUserById/${this.masterId}`,
      type: 'GET',
      success: (results) => {
        console.log('This is the result of /getUserById request: ', results);
        let imgProtocol = 'http://';
        this.setState({
          _id: results._id,
          id: results.id,
          handle: results.handle,
          username: results.name,
          photo: imgProtocol + results.image_url,
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

      <StyledContainer>
            <StyledImg src={this.state.photo} />

            <StyledUser >{this.state.username}</StyledUser>

            <MetaData followers={this.state.followers} tracks={this.state.tracks}/>

          <FollowButton handleClick={this.handleAddFollowClick} isFollowed={this.state.isFollowed} />

          <Report />
      </StyledContainer>
    )
  }
}
export default User;