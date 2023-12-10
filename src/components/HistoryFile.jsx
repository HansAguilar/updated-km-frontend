import React from 'react';
import { Page, Text, Document, StyleSheet, View, Image } from '@react-pdf/renderer';
import kmlogo from "../assets/kmlogo.jpg";

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

function PDFFile({ data }) {
  return (
    <Document>
      <Page style={styles.body}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={kmlogo} />
        </View>
        <View style={{ marginVertical: 4 }}>
          <Text style={{ color: "#2b2b2b", fontSize: 12 }}>Appointment History</Text>
        </View>

        <View style={styles.tableHeader}>
          <View style={{ ...styles.cell }}>
            <Text style={{ ...styles.tableHeaderText, textAlign: "center" }}>PATIENT</Text>
          </View>
          <View style={{ ...styles.cell }}>
            <Text style={{ ...styles.tableHeaderText, textAlign: "center" }}>DENTIST</Text>
          </View>
          <View style={{ ...styles.cell }}>
            <Text style={{ ...styles.tableHeaderText, textAlign: "center" }}>APPOINTMENT DATE</Text>
          </View>
          <View style={{ ...styles.cell }}>
            <Text style={{ ...styles.tableHeaderText, textAlign: "center" }}>DESCRIPTION</Text>
          </View>
          <View style={{ ...styles.cell }}>
            <Text style={{ ...styles.tableHeaderText, textAlign: "center" }}>STATUS</Text>
          </View>
        </View>

        {
          data.map((val, idx) => (
            <View style={styles.tableBodyEven} key={idx}>
              <View style={{ ...styles.cell }}>
                <Text style={styles.tableBodyText}>{val.name}</Text>
              </View>

              <View style={{ ...styles.cell }}>
                <Text style={styles.tableBodyText}>{val.dentist}</Text>
              </View>

              <View style={{ ...styles.cell }}>
                <Text style={styles.tableBodyText}>{val.appointmentDate}</Text>
              </View>

              <View style={{ ...styles.cell }}>
                <Text style={styles.tableBodyText}>{val.description}</Text>
              </View>

              <View style={{ ...styles.cell }}>
                <Text style={styles.tableBodyText}>{val.status}</Text>
              </View>
            </View>
          ))
        }

        {/* Page Number */}
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
        />
      </Page>
    </Document>
  )
}

export default PDFFile