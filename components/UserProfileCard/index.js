import { useUser } from 'components/UserContext'
import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import AuthenticationButton from 'components/AuthenticationButton'

const useStyles = makeStyles({
  card: {
    maxWidth: 250
  },
  media: {
    height: 250
  }
})

export default function MediaCard(props) {
  const { className } = props
  const classes = useStyles()
  const user = useUser()

  return (
    <Card className={clsx(className, classes.card)}>
      <CardMedia
        className={classes.media}
        image={user.picture}
        title="Contemplative Reptile"
      />
      <CardContent>
        <Typography gutterBottom component="h2" variant="h5">
          {user.name}
        </Typography>
        <Typography color="textSecondary" component="p" variant="body2">
          {user.email}
        </Typography>
      </CardContent>
      <CardActions>
        <AuthenticationButton color="primary" />
      </CardActions>
    </Card>
  )
}
