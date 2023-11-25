import { PDFDownloadLink } from '@react-pdf/renderer';
import React from 'react';
import FileIcons from './FileIcons';
import PDFFile from './PDFFile';
import { AiFillFilePdf } from 'react-icons/ai';
import DentistPDFFile from './DentistPDFFile';
import ServicesPDFFile from './ServicesPDFFile';


function PDFButton({ data, type }) {
  const currentDate = new Date();
  const options = { timeZone: 'Asia/Manila', month: 'short', day: 'numeric', year: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('en-US', options).replace(/ /g, '-');

  const processPDF = {
    "dentist": { docs: <DentistPDFFile data={data} />, fileName: `KmGeronimoDentalClinic-${formattedDate}-Dentist` },
    "admin": { docs: <PDFFile data={data} type="admin"/>, fileName: `KmGeronimoDentalClinic-${formattedDate}-Admin` },
    "patients": { docs: <PDFFile data={data} type="patient"/>, fileName: `KmGeronimoDentalClinic-${formattedDate}-Patients` },
    "services": { docs: <ServicesPDFFile data={data} />, fileName: `KmGeronimoDentalClinic-${formattedDate}-Services` },
  }

  return (
    <PDFDownloadLink
      document={processPDF[type].docs}
      fileName={processPDF[type].fileName}>
      <FileIcons Icon={AiFillFilePdf} title={"PDF"} />
    </PDFDownloadLink>
  )
}

export default PDFButton