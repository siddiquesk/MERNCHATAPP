import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ChatList() {
  const [chat, setChat] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await axios.get("http://localhost:8000/chat");
        setChat(res.data.chats);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };
    fetchChats();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this chat?")) return;

    try {
      await axios.delete(`http://localhost:8000/chat/${id}`);
      setChat(chat.filter((chats) => chats._id !== id));
    } catch (error) {
      console.error("Error deleting chat:", error);
    }
  };

  return (
    <>
      <Link to="/new">
        <h4 className="mx-5">Create New Chat</h4>
      </Link>
      <div className="container mt-3 d-flex flex-wrap gap-5 row mx-4 mb-4">
        {chat.map((chats) => (
          <div
            className="card shadow"
            style={{ width: "19rem" }}
            key={chats._id}>
            <div className="card-body">
              <h5 className="card-title">From : {chats.from}</h5>
              <h5 className="card-title">To : {chats.to}</h5>
              <p className="card-text">{chats.msg}</p>
              <p className="card-text">{chats.date}</p>
            </div>
            <div className="card-body d-flex justify-content-evenly gap-5">
              <button
                className="btn  btn-dark "
                onClick={() => handleDelete(chats._id)}>
                Delete
              </button>
              {/* ✅ Fixed ID usage */}
              <Link to={`/edit/${chats._id}`}>
                <span className="btn btn-danger">Edit Chat</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ChatList;
