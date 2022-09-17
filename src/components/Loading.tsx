import React from 'react'
import { Box } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';

export const Loading: React.FC = () => {
  return (
    <Box sx={{ p: 6 }}>
      <div style={{ height: 400, width: '100%' }}>
        <CircularProgress size={150} sx={{ marginLeft: 50 }} />
      </div>
    </Box>
  )
}
