import { TextField} from "@mui/material";

export default function UserMetaData({metadata, edit}) {


    if (edit) {
        return (
            <div>
                <TextField defaultValue={JSON.stringify(metadata,undefined, 2)}
                           rows={8}
                           cols={50}
                           multiline
                           fullWidth
                           name={'metadata'}
                />
            </div>
        )
    } else {
        return (
            <div>
                <h5>MetaData</h5>
                <div><pre>{JSON.stringify(metadata,undefined,2)}</pre></div>
            </div>
        )
    }

}
