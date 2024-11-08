import React, { useState } from 'react';

const schemaOptions = [
    { label: "First Name", value: "first_name" },
    { label: "Last Name", value: "last_name" },
    { label: "Gender", value: "gender" },
    { label: "Age", value: "age" },
    { label: "Account Name", value: "account_name" },
    { label: "City", value: "city" },
    { label: "State", value: "state" }
];

function SegmentPopup({ onClose }) {
    const [segmentName, setSegmentName] = useState("");
    const [selectedSchemas, setSelectedSchemas] = useState([]);
    const [availableOptions, setAvailableOptions] = useState(schemaOptions);

    const handleAddSchema = (selectedOption) => {
        setSelectedSchemas([...selectedSchemas, selectedOption]);
        setAvailableOptions(availableOptions.filter(option => option.value !== selectedOption.value));
    };

    const handleRemoveSchema = (index) => {
        const removedOption = selectedSchemas[index];
        setSelectedSchemas(selectedSchemas.filter((_, i) => i !== index));
        setAvailableOptions([...availableOptions, removedOption]);
    };

    const handleSubmit = () => {
        const payload = {
            segment_name: segmentName,
            schema: selectedSchemas.map(schema => ({ [schema.value]: schema.label }))
        };
        console.log("Data to send:", payload);
        onClose();
    };

    return (
        <div className="popup">
            <h2>Saving Segment</h2>
            <button onClick={onClose}>Close</button>
            <div>
                <label>Enter the Name of the Segment</label>
                <input
                    type="text"
                    value={segmentName}
                    onChange={(e) => setSegmentName(e.target.value)}
                />
            </div>
            <div style={{ marginTop: '20px' }}>
                <label>Add schema to segment</label>
                <select onChange={(e) => handleAddSchema(JSON.parse(e.target.value))}>
                    <option value="">Select an option</option>
                    {availableOptions.map((option) => (
                        <option key={option.value} value={JSON.stringify(option)}>{option.label}</option>
                    ))}
                </select>
                <button onClick={() => handleAddSchema(null)}>+ Add new schema</button>
            </div>
            <div className="selected-schemas">
                {selectedSchemas.map((schema, index) => (
                    <div key={index} className="schema-item">
                        <span>{schema.label}</span>
                        <button onClick={() => handleRemoveSchema(index)}>Remove</button>
                    </div>
                ))}
            </div>
            <button onClick={handleSubmit}>Save the Segment</button>
        </div>
    );
}

export default SegmentPopup;
