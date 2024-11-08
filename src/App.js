import React, { useState } from "react";
import "./App.css";

const schemaOptions = [
  { label: "First Name", value: "first_name" },
  { label: "Last Name", value: "last_name" },
  { label: "Gender", value: "gender" },
  { label: "Age", value: "age" },
  { label: "Account Name", value: "account_name" },
  { label: "City", value: "city" },
  { label: "State", value: "state" },
];

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [segmentName, setSegmentName] = useState("");
  const [selectedSchemas, setSelectedSchemas] = useState([]);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const addSchema = (value) => {
    if (value && !selectedSchemas.some((schema) => schema.value === value)) {
      const newSchema = schemaOptions.find((schema) => schema.value === value);
      setSelectedSchemas([...selectedSchemas, newSchema]);
    }
  };

  const removeSchema = (index) => {
    const updatedSchemas = [...selectedSchemas];
    updatedSchemas.splice(index, 1);
    setSelectedSchemas(updatedSchemas);
  };

  const saveSegment = () => {
    const dataToSave = {
      segment_name: segmentName,
      schema: selectedSchemas.map((schema) => ({
        [schema.value]: schema.label,
      })),
    };
    console.log("Segment data:", dataToSave);
    closePopup();
  };

  const availableOptions = schemaOptions.filter(
    (option) => !selectedSchemas.some((schema) => schema.value === option.value)
  );

  return (
    <div className="App">
      <button className="save-button" onClick={openPopup}>
        Save segment
      </button>

      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <h2>Saving Segment</h2>
            <label>Enter the Name of the Segment</label>
            <input
              type="text"
              value={segmentName}
              onChange={(e) => setSegmentName(e.target.value)}
              placeholder="Name of the segment"
            />
            <p>To save your segment, you need to add the schemas to build the query</p>

            <div className="schema-box">
              {selectedSchemas.map((schema, index) => (
                <div key={index} className="schema-row">
                  <select
                    value={schema.value}
                    onChange={(e) => {
                      const updatedSchemas = [...selectedSchemas];
                      updatedSchemas[index] = schemaOptions.find(
                        (option) => option.value === e.target.value
                      );
                      setSelectedSchemas(updatedSchemas);
                    }}
                  >
                    {schemaOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <button className="remove-button" onClick={() => removeSchema(index)}>
                    -
                  </button>
                </div>
              ))}
            </div>

            <div className="add-schema-row">
              <select onChange={(e) => addSchema(e.target.value)} value="">
                <option value="">Add schema to segment</option>
                {availableOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <button className="add-new-schema">+ Add new schema</button>
            </div>

            <button className="save-segment" onClick={saveSegment}>
              Save the Segment
            </button>
            <button className="cancel" onClick={closePopup}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
