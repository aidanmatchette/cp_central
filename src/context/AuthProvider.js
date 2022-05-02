import {Navigate, Outlet, useLocation, useNavigate} from "react-router-dom";
import {createContext, useContext, useEffect, useState} from "react";
import {clearToken, signinBackend, appRefresh} from "../utils/useAxios";

let AuthContext = createContext(null);

function AuthProvider({children}) {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [token, setToken] = useState(null)
    const [allChoices, setAllChoices] = useState(null)
    const [user, setUser] = useState(null)
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
     
    const signin = async (e) => {
        e.preventDefault()
        const token = await signinBackend(new FormData(e.target))
        if (token) {
            await refresh()
            navigate("/")
        } else {
            navigate("/signup")
        }
    };

    const signout = async () => {
        clearToken()
        setToken(null);
        navigate("/")
    };

    const refresh = async () => {
        const refreshData = await appRefresh()
        console.log({refreshData})
        setUser(refreshData.user)
        setToken(refreshData.token)
        setAllChoices(refreshData.choices)
    }

    // hack to prefetch token before renders
    useEffect(() => {
        refresh().then(() => {
            loading && setLoading(false)
        })
    }, [loading])

    const contextData = {signin, signout, token, setToken, allChoices, user, isSideBarOpen, setIsSideBarOpen};

    // only render after initial load (persist token through page refresh)
    return <AuthContext.Provider value={contextData}>{loading ? null : children}</AuthContext.Provider>;
}


function RequireAuth() {
    let auth = useContext(AuthContext);
    let location = useLocation()
    if (!auth.token) {
        return <Navigate to="/login" state={{from: location}} replace/>;
    }

    return <Outlet/>;
}


export {AuthContext, AuthProvider, RequireAuth}
