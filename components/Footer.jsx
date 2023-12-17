import React from 'react';
import { AiFillInstagram, AiOutlineTwitter} from 'react-icons/ai';

const Footer = () => {
  return (
    <div className="footer-container">
      <p>2023 Kami Web Store All rights reserverd</p>
      <div className="icons-container">
        <div className="icons"><AiFillInstagram /></div>
        <div className="icons"><AiOutlineTwitter /></div>
      </div>
    </div>
  )
}

export default Footer