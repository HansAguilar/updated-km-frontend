import React from 'react'
import FileIcons from './FileIcons';
import { RiFileExcel2Fill } from 'react-icons/ri';
import ExcelJS from 'exceljs';

function ExcelButton({ users, title }) {
  const fields = ["fullname", "address", "gender", "email", "contactNumber", "birthday", "specialty"];

  const filteredUsers = users.map((user) => {
    const filteredData = {};
    fields.forEach((v) => {
      filteredData[v] = user[v];
    });
    return filteredData;
  });

  const printExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('MySheet1');

    // Set the table header with font size 14 and bold
    const tableHeader = fields.map((field) => {
      return {
        header: field.toUpperCase(),
        key: field,
        width: 40, // Set the width to 40 for each column
        style: { font: { bold: true } }, // Make the header bold
      };
    });

    worksheet.columns = tableHeader;

    // Add data to the worksheet starting from row 3
    const dataStartingRow = 3;
    filteredUsers.forEach((user, index) => {
      const dataRow = worksheet.getRow(dataStartingRow + index);
      dataRow.values = Object.values(user);
      dataRow.eachCell((cell) => {
        cell.width = 40;
        cell.font = { size: 14, bold: false }; // Set the font to bold
        cell.alignment = { horizontal: "left", wrapText: true, vertical: "top" };
        cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "DAEEF3" } };
        cell.style = {
          ...cell.style,
          border: { top: { style: 'thin' }, right: { style: 'thin' }, bottom: { style: 'thin' }, left: { style: 'thin' } },
          // Add padding (adjust as needed)
          top: { style: 'thin' },
          right: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
        };
      });
    });


    // Set headers in row 2
    const headerRow = worksheet.getRow(2);
    headerRow.values = fields.map(field => field.toUpperCase());
    headerRow.eachCell((cell, index) => {
      cell.width = 40;
      cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "92CDDC" } }
      cell.font = { size: 16, bold: true }; // Set the font to bold
      cell.style = {
        ...cell.style,
        border: { top: { style: 'thin' }, right: { style: 'thin' }, bottom: { style: 'thin' }, left: { style: 'thin' } },
        // Add padding (adjust as needed)
        top: { style: 'thin' },
        right: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
      };
    });

    // Calculate the width for the merged cell
    const mergedWidth = fields.length * 40; // Assuming each column has a width of 40

    // Merge cells for the header title and center-align it
    worksheet.mergeCells(`A1:${String.fromCharCode(64 + fields.length)}1`);
    worksheet.getCell('A1').value = 'KM GERONIMO DENTAL CLINIC';
    worksheet.getCell('A1').alignment = { horizontal: 'center', vertical: 'middle' }; // Use 'middle' for vertical alignment
    worksheet.getCell('A1').fill = { type: "pattern", pattern: "solid", fgColor: { argb: "31869B" } }
    worksheet.getCell('A1').font = { color: { argb: 'FFFFFFFF' }, size: 28, bold: true }


    // Set the width for the merged cell
    worksheet.getColumn('A').width = 40;

    // Generate the Excel file
    const buffer = await workbook.xlsx.writeBuffer();

    // Date file name
    const currentDate = new Date();
    const options = { timeZone: 'Asia/Manila', month: 'short', day: 'numeric', year: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options).replace(/ /g, '-'); // Format date as "Nov-25-2023"
    const fileName = `KmGeronimoDentalClinic-${formattedDate}-${title}.xlsx`;

    // Create a Blob from the buffer and create a download link
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);

    //^---------------------------------END---------------------------------

    // const fields = ["fullname", "address", "gender", "email", "contactNumber", "birthday", "specialty"];

    // const filteredUsers = users.map((user) => {
    //   const filteredData = {};
    //   fields.forEach(v => {
    //     filteredData[v.toUpperCase()] = user[v];
    //   })
    //   return filteredData;
    // })

    // const printExcel = () => {
    //   const wb = utils.book_new();
    //   let ws = utils.json_to_sheet(filteredUsers, {
    //     origin: 'A3', // Start adding data in row 4
    //     styles: {
    //       // Set all cells to bold
    //       cell: { font: { bold: true } }
    //     }
    //   });

    //   ws['A1'] = { v: 'KM GERONIMO DENTAL CLINIC', t: 's', s: { font: { bold: true }, alignment: { horizontal: "center" } } };
    //   ws['A1']['!cols'] = [{ width: 100 }]

    //   ws['!cols'] = [{ width: 20 }, { width: 30 }, { width: 10 }, { width: 30 }, { width: 20 }, { width: 20 }, { width: 20 }, { width: 15 }, { width: 15 }];

    //   const currentDate = new Date();
    //   const options = { timeZone: 'Asia/Manila', month: 'short', day: 'numeric', year: 'numeric' };
    //   const formattedDate = currentDate.toLocaleDateString('en-US', options).replace(/ /g, '-'); // Format date as "Nov-25-2023"

    //   const fileName = `KmGeronimoDentalClinic-${formattedDate}-${title}.xlsx`;

    //   utils.book_append_sheet(wb, ws, `MySheet1`);
    //   writeFile(wb, fileName);
  }

  return (
    <FileIcons Icon={RiFileExcel2Fill} title={"Excel"} eventHandler={printExcel} />
  )
}

export default ExcelButton