import { PDFDownloadLink } from '@react-pdf/renderer';
import React from 'react';
import FileIcons from './FileIcons';
import PDFFile from './PDFFile';
import { AiFillFilePdf } from 'react-icons/ai';
import PatientFile from './PatientDentistPDFFile';


function PDFButton({ patient, data, type,tableHeaderList }) {
  const currentDate = new Date();
  const options = { timeZone: 'Asia/Manila', month: 'short', day: 'numeric', year: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('en-US', options).replace(/ /g, '-');

  const processPDF = {
    "patient": { docs: <PatientFile patient={patient} tableHeaderList={tableHeaderList} data={data} />, fileName: `KmGeronimoDentalClinic-${formattedDate}-Dentist` },
  }

  return (
    <PDFDownloadLink
      document={processPDF[type].docs}
      fileName={processPDF[type].fileName}>
      <FileIcons Icon={AiFillFilePdf} title={"Download PDF"} />
    </PDFDownloadLink>
  )
}

export default PDFButton