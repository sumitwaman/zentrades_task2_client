import React, { useState } from "react";
import logo from "./logo.png";
import { useHistory, Redirect } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
function Login() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileType, setFileType] = useState("");
    const [characterEncoding, setCharacterEncoding] = useState("");
    const [delimeter, setDelimeter] = useState("");
    const [hasHeader, setHasHeader] = useState(true);
    const [defualtList, setDefaultList] = useState([
        "Product Id",
        "Subcategory",
        "Title",
        "Prices",
        "Popularity",
        "Description",
        "Rating",
        "UTM Source",
        "UTM Medium",
    ]);
    const [selectedList, setSelectedList] = useState([]);
    // const [currList,setCurrList] = useState([]);
    let currList = [];
    let navigate = useNavigate();
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };
    const b1 = ">>";
    const b2 = "<<";
    const handleFileSubmit = () => {
        const formData = new FormData();
        formData.append("file", selectedFile);
        console.log(selectedList)
        formData.append("fields", selectedList)


        fetch("https://zentrades.onrender.com/upload", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                // console.log(data.data)
                localStorage.setItem('myData', JSON.stringify(data.data));
                navigate("/data", data);

            })
            .catch((error) => console.error("Error:", error));
    };
    const addStringToList = (st) => {
        currList.push(st);
    };
    const mergeLists = async () => {
        const filteredSecondList = currList.filter(
            (item) => !selectedList.includes(item)
        );
        const mergedList = selectedList.concat(filteredSecondList);
        await setSelectedList(mergedList);
    };
    const removeDuplicatesFromFirstList = () => {
        // Use filter to create a new array with elements not present in the second list
        const filteredFirstList = selectedList.filter(
            (item) => !currList.includes(item)
        );

        // Update the state with the filtered first list
        setSelectedList(filteredFirstList);
    };
    return (
        <div className="grid h-screen">
            {/* Upper Half */}
            <div className="grid grid-cols-2 h-full ">
                {/* Left Section */}
                <div className="grid grid-cols-2  border border-black text-left m-4">
                    {/* Left Vertical Part */}
                    <div className="m-10">
                        <h3>Step 1:</h3>
                    </div>

                    {/* Right Vertical Part */}
                    <div className="p-6 ">
                        <h3 className="my-3"> Select File </h3>
                        <input type="file" onChange={handleFileUpload} className="my-3" />
                        <h3 className="my-3"> Supported File Type(s): .CSV, .JSON</h3>
                        {/* <button onClick={handleFileSubmit}>Upload File</button> */}
                        {/* Add content for the right part here */}
                    </div>
                </div>

                {/* Right Section */}
                <div className="border border-black m-4 p-4">
                    <label className="block  m-0">
                        File Type:
                        <select
                            value={fileType}
                            onChange={(e) => setFileType(e.target.value)}
                            className="m-4 p-1"
                        >
                            <option value="">Select</option>
                            <option value="json">JSON</option>
                            <option value="csv">CSV</option>
                        </select>
                    </label>
                    <label className="block m-0 ">
                        Character Encoding:
                        <select
                            value={characterEncoding}
                            onChange={(e) => setCharacterEncoding(e.target.value)}
                            className="m-4 p-1"
                        >
                            <option value="utf-8">UTF-8</option>
                        </select>
                    </label>
                    <label className="block m-0">
                        Delimeter:
                        <select
                            value={delimeter}
                            onChange={(e) => setDelimeter(e.target.value)}
                            className="m-4 p-1"
                        >
                            <option value="comma">comma </option>
                        </select>
                    </label>
                    <label className="block">
                        Has Header:
                        <input
                            type="checkbox"
                            checked={hasHeader}
                            onChange={() => setHasHeader(!hasHeader)}
                            className="m-4 p-1"
                        />
                    </label>
                </div>
            </div>

            {/* Lower Half */}
            <div className="grid place-items-center border border-black m-4 ">
                <div className="flex flex-row">
                    <div className="flex flex-col ">
                        <h2>Availbale Fields</h2>
                        <div className="border border-black m-2 p-4">
                            {defualtList.length !== 0 ? (
                                defualtList.map((item, index) => (
                                    <div key={index}>
                                        {/* Render your item content here */}
                                        <button onClick={() => addStringToList(item)}>
                                            {item}
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div></div>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <button
                            className="border border-black p-1 m-1"
                            onClick={() => mergeLists()}
                        >
                            {" "}
                            {b1}{" "}
                        </button>
                        <button
                            className="border border-black p-1 m-1"
                            onClick={() => removeDuplicatesFromFirstList()}
                        >
                            {" "}
                            {b2}
                        </button>
                    </div>

                    <div className="flex flex-col">
                        <h2>Field to be Displayed </h2>
                        <div className=" border border-black m-2 p-4">
                            {selectedList.length != 0 ? (
                                selectedList.map((item, index) => (
                                    <div key={index}>
                                        {/* Render your item content here */}
                                        <button onClick={() => addStringToList(item)}>
                                            {item}
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div></div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-end">
                <button onClick={() => handleFileSubmit()} className="bg-green-500 text-white p-2 mr-10 my-5">
                    Next
                </button>
                <button onClick={() => window.location.reload()} className="bg-green-500 text-white p-2 mr-10 my-5">
                    cancel
                </button>
            </div>
        </div>
    );
}

export default Login;
