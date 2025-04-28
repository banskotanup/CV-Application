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
  const [status, setStatus] = useState("saving");
  const componentRef = useRef();

  function updateGeneralInfo(field, value) {
    setGeneralInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleGenerateClick() {
    setStatus("gettingReady");
    await sendMessage();
    setStatus("gettingInfo");
    await sendMessage();
    setStatus("generating");
    await sendMessage();
    setIsGenerated(!isGenerated);
    setStatus("generated");
  }

  async function handleBackClick() {
    //generating, gettingInfo, gettingReady ---> status
    setStatus("goingBack");
    await sendMessage();
    setIsGenerated(!isGenerated);
    setStatus("saving");
  }

  function handleDownload() {
    if (componentRef.current) {
      const clonedNode = componentRef.current.cloneNode(true); // 👈 clone the node
      html2pdf()
        .from(clonedNode)
        .save('my-cv.pdf');
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
          {status === "saving" && (
            <div>
              <h1>CV Application</h1>
              <GeneralInfo
                data={generalInfo}
                updateData={updateGeneralInfo}
                previewMode={false}
              />
              <Education
                education={educationList}
                setEducation={setEducationList}
                previewMode={false}
              />
              <Experience
                experience={experience}
                setExperience={setExperience}
                previewMode={false}
              />
              <button onClick={handleGenerateClick}>Generate cv</button>
            </div>
          )}
          {status === "gettingReady" && (
            <div>
              <p>Getting ready...</p>
              <div className="spinner"></div>
            </div>
          )}

          {status === "gettingInfo" && (
            <div>
              <p>Getting info...</p>
              <div className="spinner"></div>
            </div>
          )}
          {status === "generating" && (
            <div>
              <p>Generating cv...</p>
              <div className="spinner"></div>
            </div>
          )}
        </>
      ) : (
        <>
          {status === "generated" && (
            <div>
              <h2 className="no-print">🎉 Your CV Preview 🎉</h2>
              <div ref={componentRef}>
                <GeneralInfo data={generalInfo} previewMode={true} />
                <Education education={educationList} previewMode={true} />
                <Experience experience={experience} previewMode={true} />
              </div>
              <button onClick={handleDownload}>Download cv</button>
              <button onClick={handlePrint}>Print cv</button>
              <button onClick={handleBackClick}>Go Back</button>
            </div>
          )}
          {status === "goingBack" && (
            <div>
              <p>Opening cv editor...</p>
              <div className="spinner"></div>
            </div>
          )}
        </>
      )}
    </>
  );
}
