import React from "react";
import styles from './Home.module.scss';

export default class Home extends React.Component {
  render () {
    return (
      <h1 className={styles.title}>Hello!</h1>
    )
  }
}
