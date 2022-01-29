import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material'

const Menu = (props) => {

  return (
    <AppBar position='static'>
      <Toolbar>
        <Button color='inherit' component={Link} to='/'>
          blogs
        </Button>
        <Button color='inherit' component={Link} to='/users' >
          users
        </Button>
        <Box sx={{ flexGrow: 1, alignItems: 'baseline', display: 'flex', justifyContent: 'flex-end' }}>
          <Typography component='span'><em>{props.name} is logged in </em></Typography>
          <Button onClick={props.handleLogOut} color='inherit'>logout</Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Menu