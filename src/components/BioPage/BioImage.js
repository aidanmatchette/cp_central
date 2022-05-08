import {useAxios} from "../../utils/useAxios";
import {useState} from "react";

export default function BioImage({canEdit, propAvatar, refreshData, userID}) {
    const [avatar, setAvatar] = useState(propAvatar)
    const backend = useAxios()

    const imageChange = async (e) => {
        let formData = new FormData()
        formData.append("avatar", e.target.files[0])
        const headers = {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }
        const result = await backend.patch(`/api/v1/user/${userID}/`, formData, headers)
        setAvatar(result.data.avatar)
    }

    return (
        <>
            <img src={avatar} alt={"Avatar"} width={'100%'} style={{borderRadius: "30%", width: "300px"}}/>
            <br/>
            {canEdit &&
                <input accept={"image/*"}
                       type={"file"}
                       name={"avatar"}
                       onChange={imageChange}
                />
            }
            <br/></>
    )
}