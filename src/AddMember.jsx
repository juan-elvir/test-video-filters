import { useCall } from "@stream-io/video-react-sdk";
import { useState } from "react";

const AddMember = () => {
  const call = useCall();
  const [formData, setFormData] = useState("");
  const addMemberToCall = async (evt) => {
    evt.preventDefault();
    const res = await call.updateCallMembers({
      update_members: [{ user_id: formData, role: "user" }]
    });
    console.log(res);

    setFormData("");
  };

  return (
    <div>
      <strong>Add Member</strong>

      <form onSubmit={addMemberToCall}>
        <label for="user-id">User ID:</label>
        <input
          name="user-id"
          type="text"
          value={formData}
          onChange={(evt) => setFormData(evt.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddMember;
