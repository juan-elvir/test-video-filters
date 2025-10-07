import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useChat } from "stream-chat-react";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

export const CreateCall = ({ setActiveCall }) => {
  const client = useStreamVideoClient();
  console.log(client);
  const [formData, setFormData] = useState({ name: "" });
  const onChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const call = client.call("default", uuidv4());
    console.log(client.streamClient.userID)
    await call.join({
      create: true,
      ring: true,
      data: {
        created_by_id: client.streamClient.userID,
        members: [{ user_id: client.streamClient.userID}],
      }
    });
    console.log(call)
    setActiveCall(call);
  };

  const handleJoin = async () => {
    const call = client.call("default", formData.name);
    await call.join()
    console.log(call)
    setActiveCall(call);
  }

  return (
    <div className="call-create-container">
      <form >
        <label>Call Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={onChange}
        />
        <button onClick={handleSubmit}>Start Call</button>
        <button onClick={handleJoin}>Join</button>

      </form>
    </div>
  );
};
