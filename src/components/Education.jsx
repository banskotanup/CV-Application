import { useState } from "react";

export function Education({ education, setEducation, previewMode }) {
  const [school, setSchool] = useState("");
  const [degree, setDegree] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("");
  const [isEditing, setIsEditing] = useState(true);
  const [status, setStatus] = useState("editing");
  const [editIndex, setEditIndex] = useState(null);
  const [currentlyStudying, setCurrentlyStudying] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const newEducation = {
      school,
      degree,
      startDate,
      endDate,
      location,
      currentlyStudying,
    };
    if (editIndex !== null) {
      const updatedEducation = [...education];
      updatedEducation[editIndex] = newEducation;
      setEducation(updatedEducation);
      setEditIndex(null);
    } else {
      setEducation([...education, newEducation]);
    }
    setSchool("");
    setDegree("");
    setStartDate("");
    setEndDate("");
    setLocation("");
    setCurrentlyStudying(false);
    setStatus("saving");
    await sendMessage();
    setIsEditing(!isEditing);
    setStatus("saved");
  }

  async function handleEdit(index) {
    setStatus("editing");
    await sendMessage();
    const edu = education[index];
    setSchool(edu.school);
    setDegree(edu.degree);
    setStartDate(edu.startDate);
    setEndDate(edu.endDate);
    setLocation(edu.location);
    setCurrentlyStudying(edu.currentlyStudying);
    setEditIndex(index);
    setIsEditing(!isEditing);
  }

  async function handleDelete(index) {
    setStatus("deleted");
    await sendMessage();
    const updatedEducation = education.filter((_, i) => i !== index);
    setEducation(updatedEducation);
    setStatus("saved");
  }

  async function handleAdd() {
    setStatus("opening");
    await sendMessage();
    setStatus("saved");
    setIsEditing(!isEditing);
  }

  function sendMessage() {
    return new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
  }

  if (previewMode) {
    return (
      <>
        <h1>Education</h1>
        {education.length > 0 ? (
          <div>
            {education.map((edu, index) => {
              return (
                <div key={index}>
                  <h4>School or University: {edu.school}</h4>
                  <p>Degree: {edu.degree}</p>
                  <p>Start date: {edu.startDate}</p>
                  {edu.currentlyStudying ? (
                    <p>I currently study here.</p>
                  ) : (
                    <p>End date: {edu.endDate}</p>
                  )}
                  <p>Location: {edu.location}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <p>No education added yet</p>
        )}
      </>
    );
  } else
    return (
      <div>
        <h1>Education</h1>
        {isEditing ? (
          <div>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="school">School:</label>
                <input
                  type="text"
                  name="school"
                  id="school"
                  placeholder="Enter university or school"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="degree">Degree:</label>
                <input
                  type="text"
                  name="degree"
                  id="degree"
                  placeholder="Enter degree"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
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
                <input
                  type="checkbox"
                  name="checkbox"
                  id="checkbox"
                  checked={currentlyStudying}
                  onChange={(e) => setCurrentlyStudying(e.target.checked)}
                />
                <label htmlFor="checkbox">I currently study here</label>
              </div>
              {currentlyStudying ? null : (
                <div>
                  <label htmlFor="end-date">End date:</label>
                  <input
                    type="date"
                    id="end-date"
                    name="end-date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              )}
              <div>
                <label htmlFor="location">Location:</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  placeholder="Enter location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div>
                <button type="submit">
                  {editIndex !== null ? "Update" : "Add education"}
                </button>
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
                {education.length > 0 ? (
                  <div>
                    <ul>
                      {education.map((edu, index) => {
                        return (
                          <li key={index}>
                            <h4>School or University: {edu.school}</h4>
                            <p>Degree: {edu.degree}</p>
                            <p>Start date: {edu.startDate}</p>
                            {edu.currentlyStudying ? (
                              <p>I currently study here.</p>
                            ) : (
                              <p>End date: {edu.endDate}</p>
                            )}
                            <p>Location: {edu.location}</p>
                            <button onClick={() => handleEdit(index)}>
                              Edit
                            </button>
                            <button onClick={() => handleDelete(index)}>
                              Delete
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                    <button onClick={handleAdd}>Add education</button>
                  </div>
                ) : (
                  <p>No education added yet</p>
                )}
              </div>
            )}
            {status === "deleted" && (
              <div>
                <p>Deleting...</p>
                <div className="spinner"></div>
              </div>
            )}
            {status === "editing" && (
              <div>
                <p>Opening data in edit mode...</p>
                <div className="spinner"></div>
              </div>
            )}
            {status === "opening" && (
              <div>
                <p>Opening form! Please wait...</p>
                <div className="spinner"></div>
              </div>
            )}
          </div>
        )}
      </div>
    );
}
