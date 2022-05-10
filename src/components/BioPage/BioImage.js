import { useAxios } from "../../utils/useAxios";
import { Avatar } from "@mui/material";
import { useState, useEffect } from "react";

export default function BioImage({ canEdit, avatar, refreshData, userID }) {
  const backend = useAxios();
  const [validPic, setValidPic] = useState(true);
  const imageChange = async (e) => {
    let formData = new FormData();
    formData.append("avatar", e.target.files[0]);
    const headers = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    await backend.patch(`/api/v1/user/${userID}/`, formData, headers);
    refreshData();
  };
  const pictureError = () => {
    return <Avatar src="/broken-image" />;
  };
  return (
    <>
      {validPic ? (
        <img
          src={avatar}
          alt={"Avatar"}
          width={"100%"}
          onError={() => setValidPic(false)}
          style={{ borderRadius: "30%", width: "300px" }}
        />
      ) : (
        <Avatar
          src="/broken-image"
          sx={{
            height: 200,
            width: 200,
            margin: "auto",
            mb: 3,
            display: "flex",
            justifyContent: "center",
          }}
        />
      )}

      {canEdit && (
        <input
          accept={"image/*"}
          type={"file"}
          name={"avatar"}
          onChange={imageChange}
        />
      )}
      <br />
    </>
  );
}
