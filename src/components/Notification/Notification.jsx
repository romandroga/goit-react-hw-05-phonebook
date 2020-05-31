import React from 'react';
import { notification, text } from './Notification.module.css';

const Notification = () => (
  <div className={notification}>
    <p className={text}>Contact already exist!</p>
  </div>
);

export default Notification;
