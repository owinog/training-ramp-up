import { useState } from "react";

const UploadForm = () => {
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    };
    const submitHandler = () => {
        const formData = new FormData();
        formData.append("file", selectedFile);
        fetch("http://localhost:5001/file", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((result) => {
                console.log("Success:", result);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };
    return (
        <>
            <span>Import Students : </span>
            <input
                type="file"
                name="file"
                onChange={(event) => changeHandler(event)}
            />
            {isFilePicked ? (
                <div>
                    <p>Filename: {selectedFile.name}</p>
                    <p>
                        Size:{" "}
                        {parseInt(selectedFile.size) > 1024
                            ? parseFloat(selectedFile.size) / 1024 + " KB"
                            : selectedFile.size + " B"}
                    </p>
                </div>
            ) : (
                <p>Select a file to show details</p>
            )}
            <button onClick={submitHandler}>Submit</button>
        </>
    );
};

export default UploadForm;
