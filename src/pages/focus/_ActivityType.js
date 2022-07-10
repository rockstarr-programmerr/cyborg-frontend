import React, { Component } from 'react';
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio';


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
