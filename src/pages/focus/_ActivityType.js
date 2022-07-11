import React, { Component } from 'react';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material'


class ActivityType extends Component {
  render() {
    return (
      <FormControl>
        <FormLabel id="focus-form-activity-type">I am</FormLabel>
        <RadioGroup
          aria-labelledby="focus-form-activity-type"
          name="activity_type"
          row
        >
          <FormControlLabel value="task" label="Doing a task" control={<Radio />} />
          <FormControlLabel value="skill" label="Learning a skill" control={<Radio />} />
        </RadioGroup>
      </FormControl>
    );
  }
}

export default ActivityType;
