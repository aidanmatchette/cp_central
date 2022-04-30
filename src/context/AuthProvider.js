import {Navigate, Outlet, useLocation, useNavigate} from "react-router-dom";
import {createContext, useContext, useEffect, useState} from "react";
import {getLocalToken, clearToken, getAllChoices, signinBackend, appRefresh} from "../utils/useAxios";

let AuthContext = createContext(null);

function AuthProvider({children}) {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [token, setToken] = useState(null)
    const [allChoices, setAllChoices] = useState(null)
    const [user, setUser] = useState(null)

    const signin = async (e) => {
        e.preventDefault()
        console.dir(e)
        const loginDetails = await signinBackend(new FormData(e.target))
        if (loginDetails?.token) {
            setToken(loginDetails.token)
            setUser(loginDetails.user)
            navigate("/authHome")
        } else {
            navigate("/signup")
        }
    };

    const signout = async () => {
        clearToken()
        setToken(null);
        navigate("/")
    };

    // hack to prefetch token before renders
    useEffect(() => {
        appRefresh().then((res)=>{
            setUser(res.user)
            setToken(res.token)
            setAllChoices(res.choices)
        })
        loading && setLoading(false)
    }, [loading])

    const contextData = {signin, signout, token, setToken, allChoices, user};

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