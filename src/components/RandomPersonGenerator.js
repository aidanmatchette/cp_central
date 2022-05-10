import {useContext, useState} from "react";
import {useAxios} from "../utils/useAxios";
import {Box, Button, Modal, ThemeProvider, Typography} from "@mui/material";
import theme from "../utils/theme";
import {DayContext} from "../context/DayProvider";
import dayjs from "dayjs";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "white",
    boxShadow: 24,
    padding: 6,
    borderRadius: 5,
};

function RandomPersonGenerator() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [randUser, setRandUser] = useState();
    const {date} = useContext(DayContext);
    const backend = useAxios();

    const handleRandomPerson = async () => {
        const response = await backend.get("api/instructor/checkin/", {params: {date: dayjs(date).format("YYYY-MM-DD")}})
        let randIndex = Math.floor(Math.random() * response.data.length);
        setRandUser(response.data[randIndex]);
        setIsModalOpen(true);
    };

    return (
        <ThemeProvider theme={theme}>
            <Button
                onClick={handleRandomPerson}
                variant="outlined"
                color="secondary"
                sx={{width: "80%", mt: 3}}
            >
                Random Person
            </Button>
            <Modal
                keepMounted
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box style={style} sx={{backgroundColor: "white"}}>
                    <Typography
                        id="keep-mounted-modal-title"
                        variant="h5"
                        component="h2"
                        sx={{textAlign: "center", fontWeight: 700}}
                    >
                        Random Person
                    </Typography>
                    <Typography
                        id="keep-mounted-modal-description"
                        sx={{mt: 2, mb: 2, textAlign: "center"}}
                    >
                        {randUser
                            ? `${randUser?.first_name} ${randUser?.last_name}`
                            : "Please generate a checkin for the day."}
                    </Typography>
                </Box>
            </Modal>
        </ThemeProvider>
    );
}

export default RandomPersonGenerator;
