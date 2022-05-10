import {Button, Snackbar} from "@mui/material";
import {ThemeProvider} from "@mui/material/styles";
import theme from "../utils/theme.js";
import {Refresh} from "@mui/icons-material";
import {useAxios} from "../utils/useAxios";
import {useContext, useState} from "react";
import {DayContext} from "../context/DayProvider";


export default function RefreshLesson() {
const backend = useAxios()
    const {landingRaw, getLandingData} = useContext(DayContext)
    const [snackOpen, setSnackOpen] = useState(false)
    const [snackMessage, setSnackMessage] = useState(false)

    const refreshLesson = async () =>{
    // TODO update for multiple lessons when implemented
        const result = await backend.post('/api/refresh_lesson/',{"id":landingRaw?.lessons[0].id})
        if (result.status === 200){
            await getLandingData()
            setSnackMessage("Lesson was refreshed from GitHub")
            setSnackOpen(true)
        }else{
            setSnackMessage("Error: unable to apply changes from GitHub")
            setSnackOpen(true)
        }
    }
  return (
    <ThemeProvider theme={theme}>
      <Button sx={{ width: "80%", mt: 3 }} color="secondary" variant="outlined" onClick={()=>refreshLesson()}>
        <Refresh fontSize={"large"} sx={{mr:1}}/> Refresh Lesson
      </Button>
        <Snackbar open={snackOpen} autoHideDuration={3000} message={snackMessage}        />
    </ThemeProvider>
  )
}
