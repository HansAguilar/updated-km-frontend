import { PDFDownloadLink } from '@react-pdf/renderer';
import React from 'react';
import FileIcons from './FileIcons';
import { AiFillFilePdf } from 'react-icons/ai';
import HistoryFile from './HistoryFile';
// import LoadingSpinner from './LoadingSpinner';

function PDFButton({data}) {
  return (
    <PDFDownloadLink document={<HistoryFile data={data} />
    } fileName={
      "medical history reports"
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