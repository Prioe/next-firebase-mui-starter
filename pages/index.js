import React from 'react'
import { getInitialUser } from 'components/UserContext'
import UserProfileCard from 'components/UserProfileCard'
import Box from 'components/Box'

function Index() {
  return (
    <>
      <Box clone mx="auto" my={2}>
        <UserProfileCard />
      </Box>
    </>
  )
}

Index.getInitialProps = getInitialUser()

export default Index
