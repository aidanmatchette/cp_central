import {useAxios} from "../../utils/useAxios";

export default function BioImage({canEdit, avatar, refreshData, userID}) {
    const backend = useAxios()

    const imageChange = async (e) => {
        let formData = new FormData()
        formData.append("avatar", e.target.files[0])
        const headers = {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }
        await backend.patch(`/api/v1/user/${userID}/`, formData, headers)
        refreshData()
    }

    return (
        <>
            <img src={avatar} alt={"Avatar"} width={'100%'} style={{borderRadius: "30%", width: "300px"}}/>

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