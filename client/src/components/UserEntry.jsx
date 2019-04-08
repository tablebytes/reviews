import React from 'react';
import '../styles/reviewStyle.css';
import speechbubble from '../speechbubble.png';

const UserEntry = ({ userData }) => {
  const initials = userData.username.substring(0, 2);
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
