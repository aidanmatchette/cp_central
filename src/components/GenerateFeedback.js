import { useState} from "react"
import { CssBaseline, Typography, Grid, Select, TextField, FormControl, InputLabel, MenuItem, Button, Box, Container } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from '../utils/theme.js'
import { useAxios } from "../utils/useAxios";



function GenerateFeedback() {
    const backend = useAxios()
    
    const topicChoices = [
        {'topic':'Lesson Content', 'value': 0},
        {'topic':'Lesson Delivery', 'value': 1},
        {'topic': 'Broken Link', 'value': 2},
        {'topic':'Add', 'value': 3},
        {'topic':'Modify', 'value': 4},
        {'topic':'Remove', 'value': 5},
    ] 
    const feedbackType = [
        {'type': 'Good', 'value': 0},
        {'type': 'OK', 'value': 1},
        {'type': 'Bad', 'value': 2},
        {'type': 'Shoutout', 'value': 3},
        {'type': 'Other', 'value': 4},
    ]
    
    const handleFeedbackSubmit = (event) => {
        event.preventDefault()
        console.dir(event)
        let feedbackForm = new FormData(event.target)
        console.log(feedbackForm)
        backend.post('/api/v1/feedback/', feedbackForm).then(response => {
            console.log(response)
        })
    }
    
    return (
      <ThemeProvider theme={theme}>
        <Container color="secondary" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography component="h1" variant="h4">
                FEEDBACK
              </Typography>
              <Box component="form" noValidate onSubmit={handleFeedbackSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          name="title"
                          label="Title"
                          type="title"
                          id="title"/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth >
                        <InputLabel required id="cohort-select-label" >Topic</InputLabel>
                            <Select fullWidth label="Topic" id="cohort-select" name={"topic"} defaultValue={""}>
                                {topicChoices.map(choice => {
                                    return <MenuItem key={choice.value} value={choice.value} >{choice.topic}</MenuItem> 
                                })}
                            </Select>
                        </FormControl>  
                      </Grid>       
                  <Grid item xs={12} sm={6}> 
                    <FormControl fullWidth >
                    <InputLabel required id="cohort-select-label" >Category</InputLabel>
                        <Select fullWidth label="Category" id="cohort-select" name={"category"} defaultValue={""}>
                            {feedbackType.map(choice => {
                                return <MenuItem key={choice.value} value={choice.value} >{choice.type}</MenuItem> 
                            })}
                        </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      multiline
                      rows="4"
                      name="description"
                      label="Description"
                      type="description"
                      id="description"/>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  color="secondary"
                  variant="contained"
                  sx={{ mt: 3}}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </Container>     
      </ThemeProvider>
    )
}

export default GenerateFeedback 
