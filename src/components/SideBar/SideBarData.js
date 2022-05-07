import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import PendingActionsRoundedIcon from '@mui/icons-material/PendingActionsRounded';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';


const listItems = [
  {
    listIcon: <HomeRoundedIcon />,
    listText: "Home",
    link: "/StudentPage"
  },
  {
    listIcon: <EventNoteRoundedIcon />,
    listText: "Lecture",
    link: ""
  },
  {
    listIcon: <PeopleAltRoundedIcon />,
    listText: "Class Roster",
    link: "/class-roster"
  },
  {
    listIcon: <QuestionAnswerRoundedIcon />,
    listText: "View Questionnaires",
    link: "/questionnaires"
  },
  {
    listIcon: <ThumbsUpDownIcon />,
    listText: "Retro Feedback",
    link: "/retro"
  }
];
const instructorListItems = [
  {
    listIcon: <HomeRoundedIcon />,
    listText: "Home",
    link: "/StudentPage"
  },
  {
    listIcon: <EventNoteRoundedIcon />,
    listText: "Lecture",
    link: ""
  },
  {
    listIcon: <PendingActionsRoundedIcon />,
    listText: "Pending Students",
    link: "/pending-students"
  },
  {
    listIcon: <PeopleAltRoundedIcon />,
    listText: "Class Roster",
    link: "/class-roster"
  },
  {
    listIcon: <QuestionAnswerRoundedIcon />,
    listText: "Edit Questionnaires",
    link: "/questionnaires"
  },
  {
    listIcon: <ThumbsUpDownIcon />,
    listText: "Retro Feedback",
    link: "/retro"
  }
];
export {listItems, instructorListItems}
