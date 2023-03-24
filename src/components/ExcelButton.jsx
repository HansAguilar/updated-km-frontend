import React from 'react'
import FileIcons from './FileIcons';
import { RiFileExcel2Fill } from 'react-icons/ri';
import { utils, writeFile } from 'xlsx';

function ExcelButton({users,title}) {
  const fields = ["patientId", "firstname", "middlename", "lastname", "gender", "address","email","phoneNumber", "age", "birthday"];

  const filteredPatients = users.map((user)=>{
    const filteredData = {};
    fields.forEach(v=>{
        filteredData[v] = user[v];
    })
    return filteredData;
  })
  
  // const header = fields.map((val)=>{
  //   return val.charAt(0).toUpperCase()+val.slice(1);
  // })
  const printExcel = () =>{
    const wb = utils.book_new();
    let ws = utils.json_to_sheet(filteredPatients, {
        origin: 'A1', // Start adding data in row 2
        styles: {
          // Set all cells to bold
          cell: { font: { bold: true } }
        }
      });
    ws['!cols'] = [{ width: 40 }, { width: 15 },{ width: 15 },{ width: 15 },{ width: 15 },{ width: 40 },{ width: 30 },{ width: 15 },{ width: 15 },{ width: 15 }];
    utils.book_append_sheet(wb, ws, `MySheet1`);
    writeFile(wb, `${title}.xlsx`);
    
  }
  return (
    <FileIcons Icon={RiFileExcel2Fill} title={"Excel"} eventHandler={printExcel} />
  )
}

export default ExcelButton