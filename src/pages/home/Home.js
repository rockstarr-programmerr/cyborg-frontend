import React from "react";
import styles from './Home.module.scss';
import { Link } from 'react-router-dom';

export default class Home extends React.Component {
  render () {
    return (
      <div>
        <h1 className={styles.title}>Hello!</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/focus">Focus</Link>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}
