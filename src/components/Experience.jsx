import { useState } from "react";

export function Experience() {
  const [experience, setExperience] = useState([]);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("");
  const [isEditing, setIsEditing] = useState(true);
    const [status, setStatus] = useState("editing");
    const [editIndex, setEditIndex] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
      const newExperience = { company, role, startDate, endDate, location };
      if (editIndex !== null) {
          const updateExperience = [...experience];
          updateExperience[editIndex] = newExperience;
          setExperience(updateExperience);
          setEditIndex(null);
      }
      else {
        setExperience([...experience, newExperience]);
      }
      setCompany("");
      setRole("");
      setStartDate("");
      setEndDate("");
      setLocation("");
      setStatus("saving");
      await sendMessage();
      setIsEditing(!isEditing);
      setStatus("saved");
  }
    
    async function handleEdit(index) {
        setStatus("editing");
        await sendMessage();
        const exp = experience[index];
        setCompany(exp.company);
        setRole(exp.role);
        setStartDate(exp.startDate);
        setEndDate(exp.endDate);
        setLocation(exp.location);
        setEditIndex(index);
        setIsEditing(!isEditing);
    }

  function sendMessage() {
    return new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
  }

  return (
    <div>
      <h1>Experience</h1>
      {isEditing ? (
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="company">Company name:</label>
              <input
                type="text"
                name="company"
                id="company"
                placeholder="Enter company name"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="role">Role:</label>
              <input
                type="text"
                name="role"
                id="role"
                placeholder="Enter role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="start-date">Start date:</label>
              <input
                type="date"
                name="start-date"
                id="start-date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="end-date">End date</label>
              <input
                type="date"
                name="end-date"
                id="end-date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="location"></label>
              <input
                type="text"
                name="location"
                id="location"
                placeholder="Enter location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div>
              <input type="checkbox" name="checkbox" id="checkbox" />
              <label htmlFor="checkbox">I currently work here</label>
            </div>
            <div>
                          <button type="submit">{ (editIndex !== null ? "Update" : "Add experience")}</button>
            </div>
          </form>
          {status === "saving" && (
            <div>
              <p>Saving...</p>
              <div className="spinner"></div>
            </div>
          )}
        </div>
      ) : (
        <div>
          {status === "saved" && (
            <div>
              <h3>Preview:</h3>
              {experience.length > 0 ? (
                <ul>
                  {experience.map((exp, index) => {
                    return (
                      <li key={index}>
                        <div>
                          <h3>Company: {exp.company}</h3>
                          <p>Role: {exp.role}</p>
                          <p>Start date: {exp.startDate}</p>
                          <p>End date: {exp.endDate}</p>
                          <p>Location: {exp.location}</p>{" "}
                        </div>
                        <button onClick={()=>handleEdit(index)}>Edit</button>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p>No experience added yet</p>
              )}
            </div>
          )}
          {status === "editing" && (
            <div>
              <p>Opening data in edit mode...</p>
              <div className="spinner"></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
