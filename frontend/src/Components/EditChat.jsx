import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
function EditChat() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [editData, setEditData] = useState({
    msg: "",
    date: "",
  });
  useEffect(() => {
    axios
      .get(`http://localhost:8000/chat/${id}`)
      .then((res) => {
        setEditData(res.data); // ✅ Pre-fill form with existing data
      })
      .catch((err) => console.error("Error fetching chat:", err));
  }, [id]);

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:8000/chat/${id}`, editData);
      navigate("/");
    } catch (err) {
      console.error("Error updating chat:", err);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="row mt-4">
          <div className="col-12 col-md-6 offset-md-2 mt-2 mb-2">
            <label htmlFor="msg" className="form-label">
              Message
            </label>
            <textarea
              className="form-control"
              id="msg"
              name="msg"
              value={editData.msg} // ✅ Pre-filled value
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
              value={editData.date} // ✅ Pre-filled value
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-12 col-md-6 offset-md-2 mt-2 mb-2">
            <button type="submit" className="btn btn-outline-dark w-100">
              Update chat
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditChat;
