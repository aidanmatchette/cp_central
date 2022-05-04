import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAxios} from "../utils/useAxios";

export default function BioPage() {
    const {userID} = useParams()
    const backend = useAxios()
    const [user, setUser] = useState(null)

    useEffect(()=>{
        backend.get(`/api/v1/user/${userID}/`)
            .then((res)=>{
            // console.log("user", res.data)
            setUser(res.data)
        })
            .catch((err)=>{
            console.log("err", err)
        })
    },[userID])

    if (!user){
        return <>non</>
    }

    return (
        <div>biopage
        </div>
    )
}