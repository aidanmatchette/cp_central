import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  List,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { useAxios } from "../../utils/useAxios";
import { DayContext } from "../../context/DayProvider";
import ActivityGroupItem from "./ActivityGroupItem";
import { Col, Row } from "react-bootstrap";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../utils/theme.js";


export default function CreateGroup() {
  const [openAdd, setOpenAdd] = useState(false);
  const { date } = useContext(DayContext);
  const [activities, setActivities] = useState();
  const backend = useAxios();
  const currentDate = dayjs().format("YYYY-MM-DD");

  const refreshData = async () => {
    const results = await backend.get("/api/v1/activity/");
    setActivities(results.data);
  };

  useEffect(() => {
    refreshData().then();
  }, [date]);

  const addGroup = async (e) => {
    e.preventDefault();
    const result = await backend.post(
      "/api/v1/activity/random_group/",
      new FormData(e.target)
    );
    if (result.status === 200) {
      await refreshData();
      setOpenAdd(false);
    } else {
      // TODO make this more user friendly
      alert("Did you create a group for today and have people checked in?");
    }
  };

  return (
    <>
      <Row className="justify-content-end">
        <Col xs={12}>
          <h4 className={"text-center"}>Groups</h4>
        </Col>
        <Col xs={12}>
          <ThemeProvider theme={theme}><Button
            variant="contained"
            color="secondary" 
            fullWidth
            className={"btn-action"}
            onClick={() => setOpenAdd(true)}
          >
            Add
          </Button></ThemeProvider>
        </Col>
      </Row>

      <Dialog open={openAdd} onClose={() => setOpenAdd(!openAdd)}>
        <form onSubmit={addGroup}>
          <DialogContent>
            <Stack spacing={2}>
              <TextField
                name={"name"}
                defaultValue={`Pairs ${dayjs().format("MM-DD")}`}
                label={"Activity Name"}
              />
              <TextField
                name={"date"}
                defaultValue={currentDate}
                label={"Date"}
              />
              <TextField
                select
                defaultValue={2}
                label={"Group Size"}
                name={"group_size"}
              >
                {[2, 3, 4, 5, 6].map((i) => (
                  <MenuItem key={i} value={i}>
                    {i}
                  </MenuItem>
                ))}
              </TextField>
              <FormControlLabel
                control={<Checkbox name={"only_checked_in"} defaultChecked />}
                label={"Only checked in"}
              />
              <FormControlLabel
                control={<Checkbox name={"include_staff"} />}
                label={"Include Staff"}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button type={"submit"}>Create</Button>
            <Button onClick={() => setOpenAdd(false)}>Cancel</Button>
          </DialogActions>
        </form>
      </Dialog>
      <List>
        {activities?.map((a) => (
          <ActivityGroupItem
            key={a.id}
            activity={a}
            refreshData={refreshData}
          />
        ))}
      </List>
    </>
  );
}
