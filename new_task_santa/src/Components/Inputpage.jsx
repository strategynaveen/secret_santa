import React, { useState } from 'react';
import { MuiFileInput } from 'mui-file-input';
import api from '../utils/api';
import {setToken} from '../utils/token';
import { useNavigate } from 'react-router-dom';

const InputPage = () => {
    // Employee inputs handling
    const [empValue, setEmpValue] = useState(null);
    const [empError, setEmpError] = useState('');

    const navigate = useNavigate();
    
    const empHandleChange = (file) => {
        const selectedFile = file;
        console.log("Selected Employee File:", selectedFile); // Log to check file
        if (selectedFile && validateFile(selectedFile, setEmpError)) {
            setEmpValue(selectedFile);
        } else {
            setEmpValue(null);
        }
    };

    // Previous Santa list handling
    const [prevValue, setPrevValue] = useState(null);
    const [prevError, setPrevError] = useState('');
    
    const prevYearHandleChange = (filePrev) => {
        console.log("Selected Previous Year File:", filePrev); // Log to check file
        if (filePrev && validateFile(filePrev, setPrevError)) {
            setPrevValue(filePrev);
        } else {
            setPrevValue(null);
        }
    };

    // Validate file type
    const validateFile = (file, setErrors) => {
        const validTypes = [
            'text/csv', 
            'application/vnd.ms-excel', 
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ];
        const currentFileType = file.type;

        if (!validTypes.includes(currentFileType) && !file.name.match(/\.(csv|xlsx)$/)) {
            setErrors('Please upload a valid CSV file.');
            return false;
        }

        setErrors('');
        return true;
    };

    const handleSubmit = () => {
        let formData = new FormData();

        if (!empValue) {
            setEmpError("Employee file not found");
            return; // Stop submission if the first file is missing
        }

        // Append the first file
        formData.append("emp_csv", empValue);

        // Append the second optional file if available
        if (prevValue) {
            formData.append("optional_file", prevValue);
        }

        console.log(empValue);
        console.log(formData.get('emp_csv'));
        console.log("optional file is");
        console.log(formData.get('optional_file'));

            api.post('/inputs/img', formData,{
                headers:{
                    'Content-Type': 'multipart/form-data',
                }  
            })
            .then(response => {
                console.log("Upload success response:", response);
                // Handle success response here
                if(response.data.status===true){
                    setToken(response.data.token);
                    navigate('/output');
                }
            })
            .catch(error => {
                console.error("Axios error response issue:", error);
                // Handle error response here
            });
    };

    return (
        <div className="flex justify-center flex-row items-center mt-[100px]">
            <div className="lg:w-[50%] md:w-[60%] sm:w-[60%] max-[670px]:w-[90%] border-2 border-gray-100 rounded-lg p-4">
                <h2 className='text-center m-2 text-underline text-2xl mb-4'>Input Form Handling</h2>
                <div className='flex flex-col justify-center items-center p-2 mb-4'>
                    <MuiFileInput className='text-center justify-center items-center m-2' label='Previous Year List *' value={empValue} onChange={empHandleChange} />
                    {/* <input type="file" name="emp_csv" id="emp_csv" className='text-center justify-center items-center m-2' onChange={empHandleChange} /> */}
                    {empError && <p style={{ color: 'red', margin: '0.5rem' }}>{empError}</p>}
                </div>
                <div className='flex flex-col justify-center items-center p-2 mb-4'>
                    <MuiFileInput className='text-center justify-center items-center m-2' label='Previous Year List (optional)' value={prevValue} onChange={prevYearHandleChange} />
                    {prevError && <p style={{ color: 'red', margin: '0.5rem' }}>{prevError}</p>}
                </div>
                <div className='flex justify-center items-center w-100'>
                    <button className='lg:w-[40%] md:w-[40%] sm:w-[50%] max-[670px]:w-[80%] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    );
};

export default InputPage;