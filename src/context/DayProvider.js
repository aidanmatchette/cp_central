import {useNavigate} from "react-router-dom";
import {createContext, useContext, useEffect, useState} from "react";
import {AuthContext} from "./AuthProvider";
import dayjs from "dayjs";
import {useAxios} from "../utils/useAxios";

let DayContext = createContext(null);

function DayProvider({children}) {
    const backend = useAxios()
    const {user} = useContext(AuthContext)
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const [landingRaw, setLandingRaw] = useState(null)
    const [date, setDate] = useState(new Date())
    const [dirty, setDirty] = useState(false)

    const getLandingData = async () => {
        const rawParams = {
            'params': {
                'date': dayjs(date).format('YYYY-MM-DD')
            }
        }
        const rawLanding = await backend.get('api/student/landing/', rawParams)
        return await rawLanding.data
        // console.log({rawLanding})
    }

    useEffect(() => {
        getLandingData().then((e)=>setLandingRaw(e))
    }, [user, date, dirty])

    const contextData = {isSideBarOpen, setIsSideBarOpen, date, setDate, landingRaw, setDirty, dirty, getLandingData};

    // only render after initial load (persist token through page refresh)
    return <DayContext.Provider value={contextData}>{children}</DayContext.Provider>;
}


export {DayProvider, DayContext}
