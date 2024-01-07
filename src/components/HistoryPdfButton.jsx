import { PDFDownloadLink } from '@react-pdf/renderer';
import React from 'react';
import FileIcons from './FileIcons';
import { AiFillFilePdf } from 'react-icons/ai';
import HistoryFile from './HistoryFile';
// import LoadingSpinner from './LoadingSpinner';

function PDFButton({data,title,authorizedPerson, time}) {
  const currentDate = new Date();
  const options = { timeZone: 'Asia/Manila', month: 'short', day: 'numeric', year: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('en-US', options).replace(/ /g, '-');

  return (
    <PDFDownloadLink document={<HistoryFile data={data} title={title} time={time} authorizedPerson={authorizedPerson} />
    } fileName={
      `KmGeronimoDentalClinic-${formattedDate}-Appointment_History`
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