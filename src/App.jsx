import { useState, useRef } from "react";
import { GeneralInfo } from "./components/GeneralInfo";
import { Education } from "./components/Education";
import { Experience } from "./components/Experience";
import html2pdf from "html2pdf.js";

export default function App() {
  const [generalInfo, setGeneralInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [educationList, setEducationList] = useState([]);
  const [experience, setExperience] = useState([]);

  const [isGenerated, setIsGenerated] = useState(false);
  const [appStatus, setAppStatus] = useState("saving");
  const componentRef = useRef();
  const [isEditing, setIsEditing] = useState(true);
  const [eduEditing, setEduEditing] = useState(false);
  const [expEditing, setExpEditing] = useState(false);
  const [generalStatus, setGeneralStatus] = useState("editing");
  const [educationStatus, setEducationStatus] = useState("saved");
  const [experienceStatus, setExperienceStatus] = useState("saved");

  function updateGeneralInfo(field, value) {
    setGeneralInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleGenerateClick() {
    setAppStatus("gettingReady");
    await sendMessage();
    setAppStatus("gettingInfo");
    await sendMessage();
    setAppStatus("generating");
    await sendMessage();
    setIsGenerated(!isGenerated);
    setAppStatus("generated");
  }

  async function handleBackClick() {
    //generating, gettingInfo, gettingReady ---> appStatus
    setAppStatus("goingBack");
    await sendMessage();
    setIsGenerated(!isGenerated);
    setAppStatus("saving");
  }

  function handleDownload() {
    if (componentRef.current) {
      const clonedNode = componentRef.current.cloneNode(true); // 👈 clone the node
      html2pdf().from(clonedNode).save("my-cv.pdf");
    }
  }

  function handlePrint() {
    window.print();
  }

  function sendMessage() {
    return new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });
  }

  return (
    <>
      {!isGenerated ? (
        <>
          {appStatus === "saving" && (
            <div className="container">
              <header className="header">
                <h1>CV Application</h1>
              </header>
              <main className="main">
                <GeneralInfo
                  data={generalInfo}
                  updateData={updateGeneralInfo}
                  previewMode={false}
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                  generalStatus={generalStatus}
                  setGeneralStatus={setGeneralStatus}
                />
                <Education
                  education={educationList}
                  setEducation={setEducationList}
                  previewMode={false}
                  eduEditing={eduEditing}
                  setEduEditing={setEduEditing}
                  educationStatus={educationStatus}
                  setEducationStatus={setEducationStatus}
                />
                <Experience
                  experience={experience}
                  setExperience={setExperience}
                  previewMode={false}
                  expEditing={expEditing}
                  setExpEditing={setExpEditing}
                  experienceStatus={experienceStatus}
                  setExperienceStatus={setExperienceStatus}
                />
                <button className="generateCV" onClick={handleGenerateClick}>
                  Generate cv
                </button>
              </main>
              <footer className="footer">
                <p>Anup Banskota © {new Date().getFullYear()}</p>
              </footer>
            </div>
          )}
          {appStatus === "gettingReady" && (
            <div className="message">
              <p>Getting ready...</p>
              <div className="spinner"></div>
            </div>
          )}

          {appStatus === "gettingInfo" && (
            <div className="message">
              <p>Getting info...</p>
              <div className="spinner"></div>
            </div>
          )}
          {appStatus === "generating" && (
            <div className="message">
              <p>Generating cv...</p>
              <div className="spinner"></div>
            </div>
          )}
        </>
      ) : (
        <>
          {appStatus === "generated" && (
            <div>
              <h2 className="no-print cv">🎉 Your CV Preview 🎉</h2>
              <div ref={componentRef}>
                <GeneralInfo data={generalInfo} previewMode={true} />
                <Education education={educationList} previewMode={true} />
                <Experience experience={experience} previewMode={true} />
              </div>
              <div className="btns">
                <button onClick={handleDownload}>Download cv</button>
                <button onClick={handlePrint}>Print cv</button>
                <button onClick={handleBackClick}>Go Back</button>
              </div>
            </div>
          )}
          {appStatus === "goingBack" && (
            <div className="message">
              <p>Opening cv editor...</p>
              <div className="spinner"></div>
            </div>
          )}
        </>
      )}
    </>
  );
}
