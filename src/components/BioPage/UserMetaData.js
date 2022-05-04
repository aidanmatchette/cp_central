import {useState} from "react";

export default function UserMetaData({metadata}) {

    const [edit, setEdit] = useState(false)
    const handleSubmit = (e) =>{

    }

    if (edit){
        return (

        <form onSubmit={handleSubmit}>

                <textarea defaultValue={JSON.stringify(user.metadata)} rows={8} cols={50} name={'metadata'}/> :

        </form>
            )
    }else{
            return (
<p>{JSON.stringify(user.metadata)}</p>
    )
    }

}