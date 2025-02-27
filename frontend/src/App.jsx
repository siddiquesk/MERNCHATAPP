import React from "react";
import { Routes, Route } from "react-router-dom";
import ChatList from "./Components/ChatList";
import ChatForm from "./Components/ChatForm";
import EditChat from "./Components/EditChat";

function App() {
  return (
    <>
      <div className="container mb-1">
        <h3 className="mt-3 offset-3 text-primary-emphasis">
          Sufiyan chatting app
        </h3>
        <Routes>
          <Route path="/" element={<ChatList />} />
          <Route path="/new" element={<ChatForm />} />
          <Route path="/edit/:id" element={<EditChat />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
