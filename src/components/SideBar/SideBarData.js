import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import EventNoteRoundedIcon from "@mui/icons-material/EventNoteRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import PendingActionsRoundedIcon from "@mui/icons-material/PendingActionsRounded";
import ThumbsUpDownIcon from "@mui/icons-material/ThumbsUpDown";
import ForumIcon from "@mui/icons-material/Forum";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import QuizIcon from '@mui/icons-material/Quiz';

const listItems = [
  {
    listIcon: <HomeRoundedIcon />,
    listText: "Home",
    link: "/student-dashboard",
  },
  {
    listIcon: <EventNoteRoundedIcon />,
    listText: "Lecture",
    link: "/lecture",
  },
  {
    listIcon: <PeopleAltRoundedIcon />,
    listText: "Class Roster",
    link: "/class-roster",
  },
  {
    listIcon: <QuizIcon />,
    listText: "View Questionnaires",
    link: "/questionnaires",
  },
  {
    listIcon: <ThumbsUpDownIcon />,
    listText: "Retro Feedback",
    link: "/retro",
  },
  {
    listIcon: <ForumIcon />,
    listText: "Forums",
    link: "/forum",
  },
  {
    listIcon: <AccountCircleIcon />,
    listText: "My Profile",
    link: "/biopage",
  },
];
const instructorListItems = [
  {
    listIcon: <HomeRoundedIcon />,
    listText: "Home",
    link: "/instructor-dashboard",
  },
  {
    listIcon: <EventNoteRoundedIcon />,
    listText: "Lecture",
    link: "/lecture",
  },
  {
    listIcon: <PendingActionsRoundedIcon />,
    listText: "Pending Students",
    link: "/pending-students",
  },
  {
    listIcon: <PeopleAltRoundedIcon />,
    listText: "Class Roster",
    link: "/class-roster",
  },
  {
    listIcon: <QuizIcon />,
    listText: "Edit Questionnaires",
    link: "/questionnaires",
  },
  {
    listIcon: <ThumbsUpDownIcon />,
    listText: "Retro Feedback",
    link: "/retro",
  },
  {
    listIcon: <ForumIcon />,
    listText: "Forums",
    link: "/forum",
  },
  {
    listIcon: <AccountCircleIcon />,
    listText: "My Profile",
    link: "/biopage",
  },
];
export { listItems, instructorListItems };
