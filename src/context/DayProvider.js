import { useNavigate } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import dayjs from "dayjs";
import { useAxios } from "../utils/useAxios";

let DayContext = createContext(null);

function DayProvider({ children }) {
    const navigate = useNavigate()
    const backend = useAxios()
    const { user } = useContext(AuthContext)
    const [allChoices, setAllChoices] = useState(null)
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const [landingRaw, setLandingRaw] = useState(null)
    const [date, setDate] = useState(new Date())
    const [dirty, setDirty] = useState(false)

    useEffect(() => {
        const loadData = async () => {
            const rawParams = {
                'params': {
                    'date': dayjs(date).format('YYYY-MM-DD')
                }
            }
            const rawLanding = await backend.get('api/student/landing/', rawParams)
            setLandingRaw(rawLanding.data)
            // console.log({rawLanding})
        }
        loadData().then()
    }, [user, date, dirty])

    // const checkChange = async () => {
    //     console.log("checking for changes")
    //     // TODO implement
    //
    // }
    //
    // useEffect(() => {
    //     // TODO set to true in .env file
    //     if (process.env.REACT_APP_USE_POLLING === 'true') {
    //         const timer = setInterval(checkChange, 2000)
    //         return () => clearInterval(timer)
    //     }
    // }, [])

    const contextData = { allChoices, isSideBarOpen, setIsSideBarOpen, date, setDate, landingRaw, setDirty, dirty };

    // only render after initial load (persist token through page refresh)
    return <DayContext.Provider value={contextData}>{children}</DayContext.Provider>;
}


export { DayProvider, DayContext }
