const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');


async function find_secret_child_res(emp_file) {
    const get_emp_arr = await get_read_file(emp_file);
    let output = get_emp_arr;
    for(const[index,item] of get_emp_arr.entries()){
        if (output.length>0) {
          
            if (parseInt(index+1)===get_emp_arr.length) {
                get_emp_arr[index]['secret_child_name'] = get_emp_arr[0]['Employee_Name'];
                get_emp_arr[index]['secret_child_email'] = get_emp_arr[0]['Employee_EmailID'];
                output.splice(0,1);
            }else{
                get_emp_arr[index]['secret_child_name'] = get_emp_arr[index+1]['Employee_Name'];
                get_emp_arr[index]['secret_child_email'] = get_emp_arr[index+1]['Employee_EmailID'];
                output.splice(index+1,1);
        
            }  
        }
    
        
    }

    return get_emp_arr;
}


async function read_csv(req,res){
  
    const emp_file = req.body.emp_name;
    const optional_file = req.body.prev_name;

     const optional_data = await get_read_file(optional_file);

    // const output = await processEmployeeData(get_emp_data,index_arr);
    let final_data;
    if (optional_data===null) {
        final_data = await find_secret_child_res(emp_file);
    }else{
        final_data = await find_secret_child_res(optional_file);
    }
    
    res.send({output1:final_data,filename2:optional_data});



}

// get csv read
async function get_read_file(file_name){

  const directoryPath = path.join(__dirname, '../uploads');
  const filePath = path.join(directoryPath, file_name);
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const jsonData = xlsx.utils.sheet_to_json(worksheet);

  return jsonData;
}





module.exports = {
    read_csv,
    get_read_file
};