import "./theme1.css"
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage.js";
import Signup from "./pages/Signup";
import { AuthProvider, RequireAuth } from "./context/AuthProvider";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import StudentPage from "./pages/StudentPage.js";
import InstructorPage from "./pages/InstructorPage.js";
import { DayProvider } from "./context/DayProvider";
import StudentApprovalPage from "./pages/StudentApproval/StudentApprovalPage";
import BioPage from "./pages/BioPage";
import ClassRosterPage from "./pages/ClassRosterPage";
import SearchResults from "./pages/SearchResults";
import LessonLinksPage from "./pages/LessonLinksPage";
import Questionnaires from "./pages/Questionnaires";
import QuestionnaireEdit from "./pages/QuestionnaireEdit";
import QuestionnaireFill from "./pages/QuestionnaireFill";
import Retro from "./pages/Retro";
import Forum from "./pages/Forum";
import ForumTopic from "./pages/ForumTopic";
import LecturePage from "./pages/LecturePage";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <DayProvider>
          <NavBar />
          <Routes>
            <Route path={"/"} element={<HomePage />} />
            <Route path={"/login"} element={<LoginPage />} />
            <Route path={"/signup"} element={<Signup />} />
            {/* Will redirect to login page if trying to reach any of these pages w/o being authenticated */}
            <Route element={<RequireAuth />}>
              <Route path={"/student-dashboard"} element={<StudentPage />} />
              <Route path={"/instructor-dashboard"} element={<InstructorPage />} />
              <Route
                path={"/pending-students"}
                element={<StudentApprovalPage />}
              />

              <Route path={"/biopage"} element={<BioPage />} />
              <Route path={"/biopage/:userID"} element={<BioPage />} />
              <Route path={"/class-roster"} element={<ClassRosterPage />} />
              <Route path={"/search/:keyword"} element={<SearchResults />} />
              <Route path={"/lesson-links"} element={<LessonLinksPage />} />
              <Route path={"/questionnaires"} element={<Questionnaires />} />
              <Route path={"/forum"} element={<Forum />} />
              <Route path={"/forumTopic/:topicID"} element={<ForumTopic />} />
              <Route path={"/retro"} element={<Retro />} />
              <Route
                path={"/questionnaireFill/:questionnaireID"}
                element={<QuestionnaireFill />}
              />
              <Route
                path={"/questionnaireEdit/:questionnaireID"}
                element={<QuestionnaireEdit />}
              />
              <Route path={"/lecture"} element={<LecturePage />} />
            </Route>
          </Routes>
        </DayProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
