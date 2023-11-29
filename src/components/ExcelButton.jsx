import React from 'react'
import FileIcons from './FileIcons';
import { RiFileExcel2Fill } from 'react-icons/ri';
import { utils, writeFile } from 'xlsx';

function ExcelButton({ users, title }) {
  let fields;

  if (title === "admin") {
    fields = ["firstname", "middlename", "lastname", "gender", "address", "email", "contactNumber", "birthday"];
  }
  else {
    fields = ["firstname", "middlename", "lastname", "gender", "address", "email", "contactNumber", "birthday", "age"];
  }

  const filteredPatients = users.map((user) => {
    console.log(user);
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
    let ws = utils.json_to_sheet(filteredPatients, {
      origin: 'A1', // Start adding data in row 2
    });

    ws['!cols'] = [{ width: 20 }, { width: 20 }, { width: 20 }, { width: 10 }, { width: 40 }, { width: 30 }, { width: 20 }, { width: 15 }, { width: 10 }];

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