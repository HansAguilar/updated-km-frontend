import React from 'react';
import { Page, Text, Document, StyleSheet, View } from '@react-pdf/renderer';

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
    backgroundColor: '#06b6d4',
    padding: 3,
    fontSize: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#075985',
  },
  tableBodyOdd: {
    flexDirection: "row",
    backgroundColor: 'rgb(241 245 230)',
    padding: 3,
    fontSize: 10,
  },
  tableBodyEven: {
    flexDirection: "row",
    backgroundColor: "rgb(241 245 249)",
    padding: 3,
    fontSize: 10,
  },
  tableHeaderText: {
    fontWeight: 'extrabold',
    textAlign: 'center',
    color: 'white'
  },
  tableBodyText: {
    textAlign: 'center',
    color: '#1f2937'
  },
});

function PDFFile({ data }) {
  return (
    <Document>
      <Page style={styles.body}>
        <View style={styles.tableHeader}>
          <Text style={{ ...styles.tableHeaderText, flex: 3 }}>Name</Text>
          <Text style={{ ...styles.tableHeaderText, flex: 1 }}>Gender</Text>
          <Text style={{ ...styles.tableHeaderText, flex: 2 }}>Address</Text>
          <Text style={{ ...styles.tableHeaderText, flex: 3 }}>Email</Text>
          <Text style={{ ...styles.tableHeaderText, flex: 1 }}>Phone No.</Text>
          <Text style={{ ...styles.tableHeaderText, flex: 1 }}>Age</Text>
        </View>
        {data.map((val, idx) => (
          <View style={idx % 2 === 0 ? styles.tableBodyEven : styles.tableBodyOdd} key={idx}>
            <Text style={{ ...styles.tableBodyText, flex: 3 }}>{`${val.firstname} ${val.middlename} ${val.lastname}`}</Text>
            <Text style={{ ...styles.tableBodyText, flex: 1 }}>{val.gender}</Text>
            <Text style={{ ...styles.tableBodyText, flex: 2 }}>{val.address}</Text>
            <Text style={{ ...styles.tableBodyText, flex: 3 }}>{val.email}</Text>
            <Text style={{ ...styles.tableBodyText, flex: 1 }}>{val.contactNumber}</Text>
            <Text style={{ ...styles.tableBodyText, flex: 1 }}>{val.age}</Text>
          </View>
        ))}
        {/* Page Number */}
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
        />
      </Page>
    </Document>
  );
}

export default PDFFile;
