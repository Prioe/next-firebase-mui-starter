import React from 'react'
import AppBar from 'components/AppBar'
import { Container } from '@material-ui/core'

export default function Layout(props) {
  const { children } = props
  return (
    <>
      <AppBar />
      <Container maxWidth="xl">{children}</Container>
    </>
  )
}
