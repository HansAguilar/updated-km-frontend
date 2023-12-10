import React from 'react'
import FileIcons from './FileIcons';
import { RiFileExcel2Fill } from 'react-icons/ri';
import { utils, writeFile } from 'xlsx';
import ExcelJS from 'exceljs';

function ExcelButton({ users, title }) {
  const fields = ["fullname", "address", "gender", "email", "contactNumber", "birthday", "specialty"];

  const filteredUsers = users.map((user) => {
    const filteredData = {};
    fields.forEach(v => {
      filteredData[v.toUpperCase()] = user[v];
    })
    return filteredData;
  })

  // const header = fields.map((val)=>{
  //   return val.charAt(0).toUpperCase()+val.slice(1);
  // })

  const printExcel = () => {
    const wb = utils.book_new();
    let ws = utils.json_to_sheet(filteredUsers, {
      origin: 'A1', // Start adding data in row 2
      styles: {
        // Set all cells to bold
        cell: { font: { bold: true } }
      }
    });
    ws['!cols'] = [{ width: 20 }, { width: 30 }, { width: 10 }, { width: 30 }, { width: 20 }, { width: 20 }, { width: 20 }, { width: 15 }, { width: 15 }];

    const currentDate = new Date();
    const options = { timeZone: 'Asia/Manila', month: 'short', day: 'numeric', year: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options).replace(/ /g, '-'); // Format date as "Nov-25-2023"

    const fileName = `KmGeronimoDentalClinic-${formattedDate}-${title}.xlsx`;

    utils.book_append_sheet(wb, ws, `MySheet1`);
    writeFile(wb, fileName);
  }

  return (
    <FileIcons Icon={RiFileExcel2Fill} title={"Excel"} eventHandler={printExcel} />
  )
}

export default ExcelButton