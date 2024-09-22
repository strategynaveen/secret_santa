import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../utils/token';
import { decodeToken } from '../utils/decode_jwt';
import api from '../utils/api';

const Outputpage = () => {
    const get_Token = getToken();
    // const get_Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOnsiZW1wX2NzdiI6W3sib3JpZ2luYWxOYW1lIjoiRW1wbG95ZWUtTGlzdC54bHN4IiwiY3VycmVudE5hbWUiOiIxNzI2NzE4MDk2NjczLUVtcGxveWVlLUxpc3QueGxzeCJ9XSwib3B0aW9uYWxfZmlsZSI6W3sib3JpZ2luYWxOYW1lIjoiRW1wbG95ZWUtTGlzdC54bHN4IiwiY3VycmVudE5hbWUiOiIxNzI2NzE4MDk2Njc1LUVtcGxveWVlLUxpc3QueGxzeCJ9XX0sImlhdCI6MTcyNjcxODA5NiwiZXhwIjoxNzI2NzIxNjk2fQ.GSuw03YTaSY5OfSnJT6PmYbjtlJCenrTdbosia_H3eU";
    const navigate = useNavigate();
    const [result,SetResult] = useState([]);

    useEffect(() => {
        // if token is empty move on home page file uplaod page
        // return is work to move on home page
        if (!get_Token) {
            navigate('/'); 
            return;
        }

        const decode_data = decodeToken(get_Token).userId;
        console.log("JWT token:", get_Token);
        console.log("Decoded data in JWT decryption:", decode_data);

        let pre_file = null;
        if (decode_data.optional_file) {
            pre_file = decode_data.optional_file[0].currentName;
        }

        console.log("Current emp file name:", decode_data.emp_csv[0].currentName);
        console.log("Optional file name:", decode_data.optional_file ? decode_data.optional_file[0].currentName : 'No optional file');

        // Make API call
        api.post('/outputs/fetch_calculate', {
            emp_name: decode_data.emp_csv[0].currentName,
            prev_name: decode_data.optional_file ? decode_data.optional_file[0].currentName : null
        })
        .then(response => {
            console.log("Upload success response:", response);
            if (response.data.output1)   {
                SetResult(response.data.output1);
            }
        })
        .catch(error => {
            console.error("Axios error response issue:", error);
        });

    }, [get_Token, navigate]);

    const csvHeaders = ["Employee_Name", "Employee_EmailID","secret_child_name","secret_child_email"];
    const download_csv = ()=>{
        const csv_Rows = [];
        csv_Rows.push(csvHeaders.join(','));
        result.forEach(row => {
            const values = csvHeaders.map(header => row[header]);
            csv_Rows.push(values.join(','));
        });
        const csvContent = csv_Rows.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'filtered_table_data.csv';
        a.click();
        URL.revokeObjectURL(url);
    }

    return (
        <>
            <div className="flex justify-center items-center text-2xl">
                Output page!!
            </div>

            <div className='flex justify-center items-center w-100'>
                <button className='lg:w-[40%] md:w-[40%] sm:w-[50%] max-[670px]:w-[80%] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' onClick={download_csv}>Download CSV</button>
            </div>


            <div  class="relative flex flex-col w-full h-full overflow-hidden text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">
                <table class="w-full text-left table-auto min-w-max">
                    <thead>
                    <tr>
                        <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                        <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                            Employee Name
                        </p>
                        </th>
                        <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                        <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                            Employee Email ID
                        </p>
                        </th>
                        <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                        <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                            Secret Child Name
                        </p>
                        </th>
                        <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                        <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                            Secret Child Email ID
                        </p>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {result.map(item=>(
                         <tr class="even:bg-blue-gray-50/50">
                         <td class="p-4">
                         <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                             {item.Employee_Name}
                         </p>
                         </td>
                         <td class="p-4">
                         <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {item.Employee_EmailID}
                         </p>
                         </td>
                         <td class="p-4">
                         <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {item.secret_child_name}
                         </p>
                         </td>
                         <td class="p-4">
                            <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                {item.secret_child_email}
                            </p>                      
                         </td>
                     </tr>
                    ))}
                   
                    
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Outputpage;
