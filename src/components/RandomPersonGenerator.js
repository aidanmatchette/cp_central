import { AuthContext } from "../context/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { useAxios } from "../utils/useAxios";
import { ThemeProvider, Box, Typography, Modal, Button } from "@mui/material";
import theme from "../utils/theme";
import { DayContext } from "../context/DayProvider";

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
  const { landingRaw } = useContext(DayContext);
  const backend = useAxios({});

  const handleRandomPerson = () => {
    backend
      .get("api/instructor/checkin/", { params: { date: landingRaw?.date } })
      .then((response) => {
        let arr = response.data.checked_in;
        // console.log("arr", arr)
        let randIndex = Math.floor(Math.random() * arr.length);
        // console.log("randIndex", randIndex)
        let randSelection = arr[randIndex];

        let rUser = landingRaw.class_roster.find((e) => e.id === randSelection);
        // console.log("rand select", randSelection, {rUser})
        setRandUser(rUser);
        setIsModalOpen(true);
      });
  };
  // console.log(randUser);
  return (
    <ThemeProvider theme={theme}>
      <Button
        onClick={handleRandomPerson}
        variant="outlined"
        color="secondary"
        sx={{ width: "80%", mt: 3 }}
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
        <Box style={style} sx={{ backgroundColor: "white" }}>
          <Typography
            id="keep-mounted-modal-title"
            variant="h5"
            component="h2"
            sx={{ textAlign: "center", fontWeight: 700 }}
          >
            Random Person
          </Typography>
          <Typography
            id="keep-mounted-modal-description"
            sx={{ mt: 2, mb: 2, textAlign: "center" }}
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
