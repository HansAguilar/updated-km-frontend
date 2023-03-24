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
            <Text style={styles.tableHeaderText}>Patient Id</Text>
            <Text style={styles.tableHeaderText}>Name</Text>
            <Text style={styles.tableHeaderText}>Gender</Text>
            <Text style={styles.tableHeaderText}>Address</Text>
            <Text style={styles.tableHeaderText}>Email</Text>
            <Text style={styles.tableHeaderText}>Phone<br />Number</Text>
            <Text style={styles.tableHeaderText}>Age</Text>
            <Text style={styles.tableHeaderText}>Birthday</Text>
          </View>
          {
            data.map((val)=>
              <View style={styles.tableBody} key={val.patientId}>
                <Text style={styles.tableBodyText}>{val.patientId}</Text>
                <Text style={styles.tableBodyText}>{`${val.firstname} ${val.middlename} ${val.lastname}`}</Text>
                <Text style={styles.tableBodyText}>{val.gender}</Text>
                <Text style={styles.tableBodyText}>{val.address}</Text>
                <Text style={styles.tableBodyText}>{val.email}</Text>
                <Text style={styles.tableBodyText}>{val.phoneNumber}</Text>
                <Text style={styles.tableBodyText}>{val.age}</Text>
                <Text style={styles.tableBodyText}>{val.birthday}</Text>
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