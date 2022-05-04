import './App.css';
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage.js";
import Signup from "./pages/Signup";
import { AuthProvider, RequireAuth } from "./context/AuthProvider";
import HomePage from "./pages/HomePage";
import AuthHomePage from './pages/AuthHomePage';
import NavBar from './components/NavBar';
import StudentPage from './pages/StudentPage.js'
import InstructorPage from './pages/InstructorPage.js'
import { DayProvider } from "./context/DayProvider";
import StudentApprovalPage from './pages/StudentApproval/StudentApprovalPage';

function App() {

    return (
        <div className="App"    >
            <AuthProvider><DayProvider>
                <NavBar />
                <Routes>
                    <Route path={"/"} element={<HomePage />} />
                    <Route path={"/login"} element={<LoginPage />} />
                    <Route path={"/signup"} element={<Signup />} />
                    {/* Will redirect to login page if trying to reach any of these pages w/o being authenticated */}
                    <Route element={<RequireAuth />}>
                        <Route path={"/studentPage"} element={<StudentPage />} />
                        <Route path={"/instructorPage"} element={<InstructorPage />} />
                        <Route path={"/pending-students"} element={<StudentApprovalPage />} />
                    </Route>
                </Routes>
            </DayProvider></AuthProvider>
        </div>
    );
}

export default App;
