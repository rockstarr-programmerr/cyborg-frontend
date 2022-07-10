import React from "react";
import ActivityType from './_ActivityType.js';
// import ActivityName from './_ActivityName.js';

export default class Focus extends React.Component {
  render () {
    return (
      <form>
        <ActivityType />
        {/* <ActivityName /> */}
      </form>
    )
  }
}
