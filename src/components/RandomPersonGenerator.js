import { AuthContext } from "../context/AuthProvider";
import { useEffect, useState } from "react";
import { useAxios } from "../utils/useAxios";
import { ThemeProvider, Box, Typography, Modal, Button } from "@mui/material";
import theme from "../utils/theme";

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
  const backend = useAxios({});

  const handleRandomPerson = () => {
    console.log("handle generate");
    backend.get("api/instructor/checkin/").then((response) => {
      let randSelection =
        response.data[Math.floor(Math.random() * response.data.length)];
      console.log(response.data);
      setRandUser(randSelection);
      setIsModalOpen(true);
    });
  };
  console.log(randUser);
  return (
    <ThemeProvider theme={theme}>
      <Button
        onClick={handleRandomPerson}
        variant="contained"
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
