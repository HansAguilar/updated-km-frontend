import { PDFDownloadLink } from '@react-pdf/renderer';
import React from 'react';
import FileIcons from './FileIcons';
import PDFFile from './PDFFile';
import { AiFillFilePdf } from 'react-icons/ai';
import DentistPDFFile from './DentistPDFFile';
// import LoadingSpinner from './LoadingSpinner';

function PDFButton({data, type}) {
  return (
    <PDFDownloadLink document={
      type === "dentist" ? <DentistPDFFile data={data} />
      :<PDFFile data={data} />
    } fileName={
      type === "dentist" ?
      "dentist-reports"
      :"patients-reports"
    }>
      <FileIcons Icon={AiFillFilePdf} title={"PDF"} />
        {/* {
            ({loading})=>{
                !loading ? (
                  <LoadingSpinner loading={loading} />  
                ) : (
                    <FileIcons Icon={AiFillFilePdf} title={"PDF"} />
                )
            }
        } */}
    </PDFDownloadLink>
  )
}

export default PDFButton