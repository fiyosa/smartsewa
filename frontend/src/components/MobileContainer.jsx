import React from 'react'
import { Container } from '@mui/material'

const MobileContainer = ({ children, sx, ...other }) => {
  return (
    <Container sx={{ maxWidth: '414px', margin: 'auto', paddingTop: 4, ...sx }} {...other}>
      {children}
    </Container>
  )
}

export default MobileContainer
