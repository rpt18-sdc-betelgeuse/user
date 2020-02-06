import React from 'react';

function FollowButton(props) {

    if (props.isFollowed == false) {
      return (

            <div className="user_add_follow_button">
            <button className="user_add_follow_btn" onClick={props.handleClick}>
              <span className="user_add_follow_icon_in_button">
                <a href=""><i className="far fa-user-plus add_follow_icon"></i></a>
              </span> Follow</button>
          </div>
      )
    } else {
      return (

          <div className="user_following_btn">
            <button className="user_following_btn" onClick={props.handleClick}>
              <span className="user_add_follow_icon_in_button">
                <a href=""><i className="fas fa-user-check "></i></a>
              </span> Following</button>
          </div>
      )
    }
};
export default FollowButton;