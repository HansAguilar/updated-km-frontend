import React from 'react';
import { Page, Text, Document, StyleSheet, View } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  body:{
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal:35,
  },
  title:{
    fontSize:24,
    textAlign: "center"
  },
  text:{
    margin:12,
    fontSize:14,
    textAlign: "justify",
    fontFamily: "Times-Roman"
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
  tableHeader:{
    flexDirection: "row",
    backgroundColor: '#06b6d4',
    padding: 3,
    fontSize: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#075985',
    // flex:"flex",
    // justifyContent:"space-between",
  },
  tableBody:{
    flexDirection: "row",
    backgroundColor: '#f1f5f9',
    padding: 3,
    fontSize: 10,
    // flex:"flex",
    // justifyContent:"space-between",
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'white'
  },
  tableBodyText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'#1f2937'
  },
});
function PDFFile({data}) {
  return (
      <Document >
        <Page style={styles.body} >
          <View style={styles.tableHeader} >
            <Text style={styles.tableHeaderText}>Patient</Text>
            <Text style={styles.tableHeaderText}>Dentist</Text>
            <Text style={styles.tableHeaderText}>Appointment Date</Text>
            <Text style={styles.tableHeaderText}>Description</Text>
            <Text style={styles.tableHeaderText}>Status</Text>
          </View>
          {
            data.map((val,idx)=>
              <View style={styles.tableBody} key={idx}>
                <Text style={styles.tableBodyText}>{`${val.name}`}</Text>
                <Text style={styles.tableBodyText}>{val.dentist}</Text>
                <Text style={styles.tableBodyText}>{`${val.appointmentDate}`}</Text>
                <Text style={styles.tableBodyText}>{val.description}</Text>
                <Text style={styles.tableBodyText}>{val.status}</Text>
              </View>
            )  
          }
          



          {/*Page Number*/}
          <Text 
          style={styles.pageNumber}
          render={({pageNumber, totalPages})=>
            `${pageNumber}/${totalPages}`
          }/>
        </Page>
      </Document>
  )
}

export default PDFFile