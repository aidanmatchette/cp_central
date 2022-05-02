import {useContext, useState} from "react";
import {signup} from "../utils/useAxios";
import {useNavigate} from "react-router-dom";
import {
    Button,
    CssBaseline,
    TextField,
    FormControl,
    Link,
    Grid,
    Box,
    Typography,
    InputLabel,
    Container,
    Select,
    MenuItem
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import {AuthContext} from "../context/AuthProvider";
import theme from '../utils/theme.js'
import validator from 'validator'


function Signup() {

    const {allChoices} = useContext(AuthContext)
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState(null)
    const validRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
    const errorText = "password between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, contain no spaces, and one special character"

    const doSignUp = (e) => {
        e.preventDefault()
        let email = e.target.email.value

        if (validator.isEmail(email) === false) {
          alert('Enter a valid email address')
          return null
        }

        if (e.target.firstName.value === "" || e.target.lastName.value ===""){
          alert('First name and last name fields cannot be blank.')
          return null
        }
          

        if (e.target.cohort.value === "") {
          alert('Please select a cohort')
          return null
        }

        if (e.target.password.value !== e.target.password2.value) {
            setErrorMessage("Passwords must match")
            alert(errorMessage)
            return null
        }
        if (e.target.password.value.match(validRegex)) {
            setErrorMessage(null)
            signup(new FormData(e.target)).then((res) => {
                navigate("/login")
            })
        } else {
            setErrorMessage(errorText)
            alert(errorMessage)
        }
    }

    return (
      <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
            <img src="https://www.codeplatoon.org/wp-content/uploads/2018/10/CP-logo-2018-abbrev-1.png" width="200" alt='cp-logo'/>
          <Typography component="h1" variant="h4">
            Sign Up
          </Typography>
          <Box component="form" noValidate onSubmit={doSignUp} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password2"
                  label="Confirm Password"
                  type="password"
                  id="password2"
                  autoComplete="new-password"
                />
              </Grid>
                {/* cohort selection */}
              <Grid item xs={12}>
                <FormControl fullWidth >
                <InputLabel required id="cohort-select-label" >Select Cohort</InputLabel>
                    <Select fullWidth label="Select Cohort" id="cohort-select" name={"cohort"} defaultValue={""}>
                        {allChoices.cohorts.map((item) => <MenuItem key={item.group_id} value={item.group_id} >{item.name}</MenuItem> )}
                    </Select>
                </FormControl>  
                
              </Grid> 
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="#/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider>
    )
}

export default Signup

