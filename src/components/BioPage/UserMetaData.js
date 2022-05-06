import {useState} from "react";
import {useAxios} from "../../utils/useAxios";

export default function UserMetaData({metadata, userID, setUser}) {
    const backend = useAxios()
    const [edit, setEdit] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(e.target.metadata.value)
        backend.patch(`/api/v1/user/${userID}/`, new FormData(e.target))
            .then((res) => {
                setUser(res.data)
                setEdit(false)
            }).catch((err) => console.log({err}))
    }

    if (edit) {
        return (
            <form onSubmit={handleSubmit} >
                <textarea defaultValue={JSON.stringify(metadata,undefined, 2)} rows={8} cols={50} name={'metadata'}/>
                <button type={"submit"}>Save</button>
                <button type={"button"} onClick={() => setEdit(false)}>Cancel</button>
            </form>
        )
    } else {
        return (
            <div id="metadata">
                <h5>MetaData</h5>
                <div onClick={() => setEdit(true)}><pre>{JSON.stringify(metadata,undefined,2)}</pre></div>
            </div>
        )
    }

}