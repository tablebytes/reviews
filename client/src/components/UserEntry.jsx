import React from 'react';
import '../styles/reviewStyle.css';

const UserEntry = ({ userData }) => {
  const initials = userData.username.substring(0, 2);
  const speechbubble = 'https://s3-us-west-1.amazonaws.com/open-tabs-reviews/images/speechbubble.png';

  return (
    <div>
      {userData.VIP ? <span className="vip-label">VIP</span> : null}
      <span className="user-initials">{initials}</span>
      <div className="user-name">{userData.username}</div>
      <div className="user-location">{userData.location}</div>
      <div className="user-review-count">
        <p>
          <img src={speechbubble} alt="bubble" height="10.5" width="11" />
          {`${userData.review_count} reviews`}
        </p>
      </div>
    </div>
  );
};

export default UserEntry;
