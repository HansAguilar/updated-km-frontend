import React from 'react';
import { Page, Text, Document, StyleSheet, View, Image } from '@react-pdf/renderer';
import kmlogo from "../assets/kmlogo.jpg";
import moment from 'moment';

const styles = StyleSheet.create({
  body: {
    paddingTop: 25,
    paddingBottom: 55,
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 24,
    textAlign: "center"
  },
  text: {
    margin: 12,
    fontSize: 14,
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
  tableHeader: {
    marginTop:10,
    flexDirection: "row",
    backgroundColor: '#d9d9d9',
    borderBottomWidth: 1,
    borderBottomColor: '#2b2b2b',
  },
  tableBodyOdd: {
    flexDirection: "row",
    backgroundColor: 'rgb(241 245 230)',
    borderBottomWidth: 1,
    borderBottomColor: '#d1d5db',
  },
  tableBodyEven: {
    flexDirection: "row",
  },
  cell: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#2b2b2b',
    padding: 1
  },

  tableHeaderText: {
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#2b2b2b',
    fontSize: 10,
    padding: 2,
  },
  tableBodyText: {
    textAlign: 'left',
    color: '#1f2937',
    fontSize: 10,
    padding: 2,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    height: 100, // Adjust the height as needed
  },
});


function DentistPDFFile({ patient, data,tableHeaderList }) {
    console.log(data);
  return (
    <Document >
      <Page style={styles.body} >

        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={kmlogo} />
        </View>
        <View style={{ marginVertical: 4 }}>
          <Text style={{ color: "#2b2b2b", fontSize: 12 }}>Patient Record</Text>
        </View>

        <View style={{width: "100%",height:"auto",display:'flex',paddingVertical:10, flexDirection:'row'}}>
            <Image style={{width: 80, height: 80}} source={{uri: patient.profile}} onError={(e) => console.error("Error loading image", e)} />
            <View>
                <Text style={{ color: "#2b2b2b", fontSize: 12, textTransform:'capitalize' }}>Full Name: {patient.firstname} {patient.middlename ? `${patient.middlename}`: ' '} {patient.lastname}</Text>
                <Text style={{ color: "#2b2b2b", fontSize: 12, textTransform:'capitalize' }}>Birthday: {patient.email}</Text>
                <Text style={{ color: "#2b2b2b", fontSize: 12, textTransform:'capitalize' }}>Gender: {patient.gender}</Text>
                <Text style={{ color: "#2b2b2b", fontSize: 12, textTransform:'capitalize' }}>Birthday: {moment(patient.birthday).format("MMMM DD, YYYY")}</Text>
                <Text style={{ color: "#2b2b2b", fontSize: 12, textTransform:'capitalize' }}>Contact Number: {patient.contactNumber}</Text>
                <Text style={{ color: "#2b2b2b", fontSize: 12, textTransform:'capitalize' }}>Address: {patient.address}</Text>
            </View>
        </View>

         <View style={styles.tableHeader}>
            {
                tableHeaderList.map((val, idx)=>(
                    <View key={idx} style={{ ...styles.cell, }}>
                        <Text style={{ ...styles.tableHeaderText }}>{val}</Text>
                    </View>
                ))
            }
        </View>


        {data.map((val, idx) => (
            
          <View style={styles.tableBodyEven} key={idx}>
            <View style={{ ...styles.cell, }}>
              <Text style={styles.tableBodyText}>{`${moment(val.date).format("MMM DD, YYYY")}`}</Text>
            </View>
            <View style={{ ...styles.cell, }}>
              <Text style={{...styles.tableBodyText, maxWidth:60}}>{val.teeth}</Text>
            </View>
            <View style={{ ...styles.cell, }}>
              <Text style={styles.tableBodyText}>{val.dentist}</Text>
            </View>
            <View style={{ ...styles.cell, }}>
              <Text style={styles.tableBodyText}>{val.procedure}</Text>
            </View>
            <View style={{ ...styles.cell, }}>
              <Text style={styles.tableBodyText}>Php. {val.amountCharged.toLocaleString()}</Text>
            </View>
            <View style={{ ...styles.cell, }}>
              <Text style={styles.tableBodyText}>Php. {val.amountPaid.toLocaleString()}</Text>
            </View>
            <View style={{ ...styles.cell, }}>
              <Text style={styles.tableBodyText}>Php. {val.balance.toLocaleString()}</Text>
            </View>
            <View style={{ ...styles.cell, }}>
              <Text style={styles.tableBodyText}>{val.status === "TREATMENT_DONE" ? "Done":"Pending"}</Text>
            </View>
          </View>
        ))}


        {/*Page Number*/}
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber}/${totalPages}`
          } />
      </Page>
    </Document>
  )
}

export default DentistPDFFile;