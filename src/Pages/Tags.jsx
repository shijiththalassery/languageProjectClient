// import React from 'react';
// import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';

// const styles = StyleSheet.create({
//   page: {
//     flexDirection: 'row',
//     backgroundColor: '#ffffff',
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//     flexGrow: 1,
//   },
//   title: {
//     fontSize: 18,
//     textAlign: 'center',
//     marginBottom: 10,
//   },
//   text: {
//     fontSize: 12,
//   },
// });

// function PDFDocument() {
//   return (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         <View style={styles.section}>
//           <Text style={styles.title}>Heading</Text>
//           <Text style={styles.text}>Paragraph content goes here...</Text>
//         </View>
//         <View style={styles.section}>
//           <Text style={styles.text}>Company Name</Text>
//         </View>
//         <View style={styles.section}>
//           <Text style={styles.text} render={({ pageNumber, totalPages }) => (
//             `Your Name (Page ${pageNumber} of ${totalPages})`
//           )} />
//         </View>
//       </Page>
//     </Document>
//   );
// }

// function Tags() {
//   return (
//     <div>
//       <div className="border border-solid border-black p-4 m-4 max-w-screen-lg mx-auto">
//         <PDFViewer width="100%" height={600}>
//           <PDFDocument />
//         </PDFViewer>
//       </div>
//     </div>
//   );
// }

// export default Tags;
