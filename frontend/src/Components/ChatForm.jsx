import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function ChatForm() {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    msg: "",
    date: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/chat", formData);
      navigate("/"); // 👈 Redirect to home after successful chat creation
    } catch (err) {
      console.error("Error creating chat:", err);
    }
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="row mt-4">
            <div className="col-12 col-md-6 offset-md-2 mt-2 mb-2">
              <label htmlFor="from" className="form-label">
                From
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Sender name"
                id="from"
                name="from"
                value={formData.from}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-12 col-md-6 offset-md-2 mt-2 mb-2">
              <label htmlFor="to" className="form-label">
                To
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Receiver name"
                id="to"
                name="to"
                value={formData.to}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-12 col-md-6 offset-md-2 mt-2 mb-2">
              <label htmlFor="msg" className="form-label">
                Message
              </label>
              <textarea
                className="form-control"
                placeholder="Leave a comment here"
                id="msg"
                name="msg"
                value={formData.msg}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-12 col-md-6 offset-md-2 mt-2 mb-2">
              <label htmlFor="date" className="form-label">
                Date
              </label>
              <input
                type="date"
                className="form-control"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-12 col-md-6 offset-md-2 mt-2 mb-2">
              <button type="submit" className="btn btn-outline-dark w-100">
                Create Chat
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default ChatForm;
