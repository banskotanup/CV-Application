import { useState } from "react";

export function Experience({
  previewMode,
  experience,
  setExperience,
  expEditing,
  setExpEditing,
  experienceStatus,
  setExperienceStatus,
}) {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [currentlyWorking, setCurrentlyWorking] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const newExperience = {
      company,
      role,
      startDate,
      endDate,
      location,
      currentlyWorking,
    };
    if (editIndex !== null) {
      const updateExperience = [...experience];
      updateExperience[editIndex] = newExperience;
      setExperience(updateExperience);
      setEditIndex(null);
    } else {
      setExperience([...experience, newExperience]);
    }
    setCompany("");
    setRole("");
    setStartDate("");
    setEndDate("");
    setLocation("");
    setCurrentlyWorking(false);
    setExperienceStatus("saving");
    await sendMessage();
    setExpEditing(!expEditing);
    setExperienceStatus("saved");
  }

  async function handleEdit(index) {
    setExperienceStatus("editing");
    await sendMessage();
    const exp = experience[index];
    setCompany(exp.company);
    setRole(exp.role);
    setStartDate(exp.startDate);
    setEndDate(exp.endDate);
    setLocation(exp.location);
    setCurrentlyWorking(exp.currentlyWorking);
    setEditIndex(index);
    setExpEditing(!expEditing);
  }

  async function handleDelete(index) {
    setExperienceStatus("deleted");
    await sendMessage();
    const updatedExperience = experience.filter((_, i) => i !== index);
    setExperience(updatedExperience);
    setExperienceStatus("saved");
  }

  async function handleAdd() {
    setExperienceStatus("opening");
    await sendMessage();
    setExperienceStatus("saved");
    setExpEditing(!expEditing);
  }

  function sendMessage() {
    return new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
  }

  if (previewMode) {
    return (
      <>
        <h1>Experience</h1>
        {experience.length > 0 ? (
          <div>
            {experience.map((exp, index) => {
              return (
                <div key={index}>
                  <h4>Company: {exp.company}</h4>
                  <p>Role: {exp.role}</p>
                  <p>Start date: {exp.startDate}</p>
                  {exp.currentlyWorking ? (
                    <p>I currently work here.</p>
                  ) : (
                    <p>End date: {exp.endDate}</p>
                  )}
                  <p>Location: {exp.location}</p>{" "}
                </div>
              );
            })}
          </div>
        ) : (
          <p>No experience added yet</p>
        )}
      </>
    );
  } else
    return (
      <div>
        <h1>Experience</h1>
        {expEditing ? (
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
                <input
                  type="checkbox"
                  name="checkbox"
                  id="checkbox"
                  checked={currentlyWorking}
                  onChange={(e) => setCurrentlyWorking(e.target.checked)}
                />
                <label htmlFor="checkbox">I currently work here</label>
              </div>
              {currentlyWorking ? null : (
                <div>
                  <label htmlFor="end-date">End date:</label>
                  <input
                    type="date"
                    name="end-date"
                    id="end-date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              )}
              <div>
                <label htmlFor="location">Location:</label>
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
                <button type="submit">
                  {editIndex !== null ? "Update" : "Add experience"}
                </button>
              </div>
            </form>
            {experienceStatus === "saving" && (
              <div>
                <p>Saving...</p>
                <div className="spinner"></div>
              </div>
            )}
          </div>
        ) : (
          <div>
            {experienceStatus === "saved" && (
              <div>
                <h3>Preview:</h3>
                {experience.length > 0 ? (
                  <div>
                    <ul>
                      {experience.map((exp, index) => {
                        return (
                          <li key={index}>
                            <div>
                              <h4>Company: {exp.company}</h4>
                              <p>Role: {exp.role}</p>
                              <p>Start date: {exp.startDate}</p>
                              {exp.currentlyWorking ? (
                                <p>I currently work here.</p>
                              ) : (
                                <p>End date: {exp.endDate}</p>
                              )}
                              <p>Location: {exp.location}</p>{" "}
                            </div>
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
                    <button onClick={handleAdd}>Add experience</button>
                  </div>
                ) : (
                  <>
                    <p>No experience added yet</p>
                    <button onClick={handleAdd}>Add experience</button>
                  </>
                )}
              </div>
            )}
            {experienceStatus === "deleted" && (
              <div>
                <p>Deleting...</p>
                <div className="spinner"></div>
              </div>
            )}
            {experienceStatus === "editing" && (
              <div>
                <p>Opening data in edit mode...</p>
                <div className="spinner"></div>
              </div>
            )}
            {experienceStatus === "opening" && (
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
