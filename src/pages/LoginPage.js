import { useContext, useRef, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from '../utils/theme.js'
import logins from '../utils/loginData.json'


function LoginPage(props) {
  let { signin } = useContext(AuthContext)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  let { isOnHomePage } = props
  let topMargin = isOnHomePage ? 0 : 8

  const fillLogin = (index) => {
    setUsername(logins[index].username)
    setPassword(logins[index].password)
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: topMargin,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          {/* CP logo */}
          <img src="https://www.codeplatoon.org/wp-content/uploads/2018/10/CP-logo-2018-abbrev-1.png" width="200" alt='cp-logo' />
          <Typography component="h1" variant="h4">
            Log In
          </Typography>
          <Box component="form" noValidate onSubmit={signin} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {/*TODO boilerplate uses username for authentication (which we can specify on signup) changing to username for now and will rewire if we want to customize the authentication*/}
                <TextField required fullWidth id="email" label="Email Address"
                  name="username" autoComplete="email" value={username} />
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth name="password" label="Password"
                  type="password" id="password" autoComplete="new-password" value={password} />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Log In
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="#/signup" variant="body2">
                  Don't have an account? Sign up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <br />
        <h3>Click a name below to populate login fields</h3>
        <ul>
          {logins.map((element, index) => <li key={index} onClick={() => fillLogin(index)}>{element.username}</li>)}
        </ul>
      </Container>
    </ThemeProvider>

  );
}

export default LoginPage


