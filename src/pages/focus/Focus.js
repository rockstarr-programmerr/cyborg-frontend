import React from "react";
import ActivityType from './_ActivityType.js';
import ActivityName from './_ActivityName.js';
import Clock from './_Clock.js';
import {
  Container,
  Box,
  Button
} from '@mui/material'

export default class Focus extends React.Component {
  render () {
    return (
      <Container maxWidth="sm">
        <form>
          <Box sx={{ mb: 2, mt: 2 }}>
            <Clock />
          </Box>

          <Box sx={{ mb: 2 }}>
            <ActivityType />
          </Box>

          <Box sx={{ mb: 4 }}>
            <ActivityName/>
          </Box>

          <Button
            variant="contained"
            size="large"
            sx={{ width: 150 }}
          >
            Start
          </Button>
        </form>
      </Container>
    )
  }
}
