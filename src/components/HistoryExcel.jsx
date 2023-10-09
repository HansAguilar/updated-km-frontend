import React from 'react';
import FileIcons from './FileIcons';
import { RiFileExcel2Fill } from 'react-icons/ri';
import ExcelJS from 'exceljs';

function ExcelButton({ users, title }) {
  const fields = ["name", "dentist", "description", "appointmentDate", "status"];

  const filteredPatients = users.map((user) => {
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
        style: { font: { size: 12 } },
      };
    });

    worksheet.columns = tableHeader;

    const fieldRow = worksheet.addRow(fields.map(field => field.toUpperCase()));
      fieldRow.eachCell({ includeEmpty: true }, (cell) => {
        cell.width = 40;
        cell.font = { bold: true }; // Set the font to bold
      });


    // Add data to the worksheet (replace this with your actual data)
    filteredPatients.forEach((user) => {
      worksheet.addRow(user);
    });

    // Calculate the width for the merged cell
    const mergedWidth = fields.length * 10; // Assuming each column has a width of 40

    // Merge cells for the header title and center-align it
    worksheet.mergeCells('A1', `E1`);
    worksheet.getCell('A1').value = 'KM GERONIMO DENTAL CLINIC';
    worksheet.getCell('A1').font = { size: 14, bold: true };
    worksheet.getCell('A1').alignment = { horizontal: 'center', vertical: 'center' };

    // Set the width for the merged cell
    worksheet.getColumn('A').width = mergedWidth;

    // Generate the Excel file
    const buffer = await workbook.xlsx.writeBuffer();

    // Create a Blob from the buffer and create a download link
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title}.xlsx`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <FileIcons Icon={RiFileExcel2Fill} title={"Excel"} eventHandler={printExcel} />
  );
}

export default ExcelButton;
