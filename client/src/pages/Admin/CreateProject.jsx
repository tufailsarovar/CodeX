import axios from "../../api/axios";
import { useState } from "react";

const CreateProject = () => {
  const [data, setData] = useState({});

  const submit = async () => {
    await axios.post("/api/admin/projects", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    });
    alert("Project Created");
  };

  return (
    <div>
      <input placeholder="Title" onChange={e => setData({...data, title:e.target.value})}/>
      <input placeholder="Price" onChange={e => setData({...data, price:e.target.value})}/>
      <input placeholder="Zip URL" onChange={e => setData({...data, zipFileUrl:e.target.value})}/>
      <button onClick={submit}>Create</button>
    </div>
  );
};

export default CreateProject;
