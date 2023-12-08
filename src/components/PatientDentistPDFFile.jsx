import React from 'react';
import { Page, Text, Document, StyleSheet, View, Image } from '@react-pdf/renderer';
import kmlogo from "../assets/kmlogo.jpg";
import moment from 'moment';

const styles = StyleSheet.create({
  body: {
    padding: 50
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
    marginTop: 10,
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
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
    paddingBottom: 8,
    gap: 6
  },
  logo: {
    height: 100, // Adjust the height as needed
  },
});


function DentistPDFFile({ patient, data, tableHeaderList }) {
  console.log(data);
  return (
    <Document >
      <Page style={styles.body} >

        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={kmlogo} />
          <Text style={{ color: "#2b2b2b", fontWeight: "demibold", fontSize: 12 }}>47 General Luna St., cor Garcia St., Brgy. San Agustin, Malabon City</Text>
          <Text style={{ color: "#2b2b2b", fontWeight: "demibold", fontSize: 12 }}>Phone No.: 0912 060 0101</Text>
          <Text style={{ color: "#2b2b2b", fontWeight: "demibold", fontSize: 12 }}>Email: KMGeronimoDental@gmail.com</Text>
        </View>

        <View style={{ width: "100%", display: 'flex', marginVertical: 20, flexDirection: 'column', gap: 20, position: "relative" }}>

          {/* <Image style={{ width: 80, height: 80 }} source={{ uri: patient.profile }} onError={(e) => console.error("Error loading image", e)} /> */}
          <View style={{ flexDirection: "row", alignItems: "center", width: "100%", flex: 1, justifyContent: "space-between" }}>
            <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
              <Text style={{ color: "#2b2b2b", fontWeight: "demibold", fontSize: 12, textTransform: 'capitalize' }}>Full Name: </Text>
              <Text style={{ color: "#2b2b2b", textDecoration: "underline", fontWeight: "demibold", fontSize: 12, textTransform: 'capitalize' }}>{patient.firstname} {patient.middlename ? `${patient.middlename}` : ' '} {patient.lastname}</Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
              <Text style={{ color: "#2b2b2b", fontWeight: "demibold", fontSize: 12, textTransform: 'capitalize' }}>Birthday: </Text>
              <Text style={{ color: "#2b2b2b", textDecoration: "underline", fontWeight: "demibold", fontSize: 12, textTransform: 'capitalize' }}>{moment(patient.birthday).format("MMMM DD, YYYY")}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center", width: "100%", flex: 1, justifyContent: "space-between" }}>
            <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
              <Text style={{ color: "#2b2b2b", fontWeight: "demibold", fontSize: 12, textTransform: 'capitalize' }}>Gender: </Text>
              <Text style={{ color: "#2b2b2b", textDecoration: "underline", fontWeight: "demibold", fontSize: 12, textTransform: 'capitalize' }}>{patient.gender}</Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
              <Text style={{ color: "#2b2b2b", fontWeight: "demibold", fontSize: 12, textTransform: 'capitalize' }}>Email: </Text>
              <Text style={{ color: "#2b2b2b", textDecoration: "underline", fontWeight: "demibold", fontSize: 12, textTransform: 'capitalize' }}>{patient.email.trim()}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center", width: "100%", flex: 1, justifyContent: "space-between" }}>
            <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
              <Text style={{ color: "#2b2b2b", fontWeight: "demibold", fontSize: 12, textTransform: 'capitalize' }}>Contact Number: </Text>
              <Text style={{ color: "#2b2b2b", textDecoration: "underline", fontWeight: "demibold", fontSize: 12, textTransform: 'capitalize' }}>{patient.contactNumber}</Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
              <Text style={{ color: "#2b2b2b", fontWeight: "demibold", fontSize: 12, textTransform: 'capitalize' }}>Address: </Text>
              <Text style={{ color: "#2b2b2b", textDecoration: "underline", fontWeight: "demibold", fontSize: 12, textTransform: 'capitalize' }}>{patient.address}</Text>
            </View>
          </View>
          
        </View>

        <View style={styles.tableHeader}>
          {
            tableHeaderList.map((val, idx) => (
              val === "Dentist" || val === "status" ?
                null
                :
                <View key={idx} style={{ ...styles.cell, }}>
                  <Text style={{ ...styles.tableHeaderText }}>{val}</Text>
                </View>
            ))
          }
        </View>


        {data.map((val, idx) => (
          <>
            <View style={styles.tableBodyEven} key={idx}>
              <View style={{ ...styles.cell, }}>
                <Text style={styles.tableBodyText}>{`${moment(val.date).format("MMM DD, YYYY")}`}</Text>
              </View>
              <View style={{ ...styles.cell, }}>
                <Text style={{ ...styles.tableBodyText, maxWidth: 60 }}>{val.teeth}</Text>
              </View>
              {/* <View style={{ ...styles.cell, }}>
                <Text style={{ ...styles.tableBodyText, maxWidth: 60 }}>{val.dentist}</Text>
              </View> */}
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
              {/* <View style={{ ...styles.cell, }}>
                <Text style={styles.tableBodyText}>{val.status === "TREATMENT_DONE" ? "Done" : "Pending"}</Text>
              </View> */}
            </View>
            {/* <View style={{ position: "absolute", bottom: 0 }}>
              <Text style={{ color: "#2b2b2b", fontWeight: "demibold", fontSize: 12, textTransform: 'capitalize' }}>{val.dentist}</Text>
            </View> */}
          </>

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