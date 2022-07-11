import { Autocomplete, TextField } from '@mui/material';
import React, { Component } from 'react';

class ActivityName extends Component {
  render() {
    return (
      <div>
        <Autocomplete
          options={['Reactjs', 'Piano']}
          freeSolo
          autoHighlight
          renderInput={params => (
            <TextField
              {...params}
              label="What skill?"
            />
          )}
        />
      </div>
    );
  }
}

export default ActivityName;
