import React from 'react';
import styled from 'styled-components';

const StyledMetaDataContainer = styled.span`
  display: flex;
  justify-content: flex-start;
  font-size: 11px;
  line-height: 12px;
  font-family: InterstateSound Tnum,Interstate,Lucida Grande,Lucida   Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;
  font-weight: 100;
  color: #999;
  cursor: pointer;
`;

const TracksContainer = styled.span`
  margin-left: 5px;
`;

const TracksIcon = styled.span`
  margin-left: 5px;
  margin-right:5px;
  color: #999;
`;

const FollowersIcon = TracksIcon;

const Icon = styled.i`
  color: #000;
`;

function MetaData(props) {
  return (
    <StyledMetaDataContainer>
      <span className="user_follwers_icon">
        <span className="user_followers">
          <FollowersIcon className="fad fa-user-friends"></FollowersIcon>
        </span>
        <div className="user followers">{props.followers}</div>
      </span>

      <TracksContainer>
        <TracksIcon>
          <Icon className="fal fa-waveform tracks_icon"></Icon>
        </TracksIcon>
        <TracksIcon>{props.tracks}</TracksIcon>
      </TracksContainer>
    </StyledMetaDataContainer>

  )
};
export default MetaData;