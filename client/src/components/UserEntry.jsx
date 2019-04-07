import React from 'react';
import '../styles/style.css';
import speechbubble from '../speechbubble.png';


const UserEntry = ({ userData }) => {
  console.log(userData);
  const initials = userData.username.substring(0, 2);

  return (
    <div>
      {userData.VIP ? <span className="vip-label">VIP</span> : null}
      <span className="user-initials">{initials}</span>
      <div className="user-name">{userData.username}</div>
      <div className="user-location">{userData.location}</div>
      <div>
        <span className="user-review-count">
          <span className="user-review-bubble"><img src={speechbubble} alt="bubble" height="15" width="16" /></span>
          {`${userData.review_count} reviews`}
        </span>
      </div>
    </div>
  );
};

export default UserEntry;
