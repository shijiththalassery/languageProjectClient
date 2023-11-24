
import React, { useEffect, useState } from 'react';
import { Document, Page, Text, View, PDFDownloadLink, Image, StyleSheet, Font } from '@react-pdf/renderer';
import html2canvas from 'html2canvas';
import StudNav from './StudNav';
import studentInstance from "../../api/studentInstace"

function Mycertificate() {
    const styles = StyleSheet.create({
        page: {
            flexDirection: 'column',
            border: '10px solid blu',
            backgroundColor: 'white',
        },
        header: {

            justifyContent: 'space-between',
            alignItems: 'center',
            fontFamily: 'Times-Roman',
            fontStyle: 'italic',
            fontWeight: 'bold',

        },
        contentContainer: {
            marginTop: 10,
            padding: 20,
        },
        logo: {
            width: 100,
            height: 100,
        },
        content: {
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        },
        title: {
            fontSize: 28,
            marginBottom: 15,
            color: 'blue',
        },
        certificateText: {
            fontSize: 20,
            color: 'green',
            marginBottom: 20,
            fontFamily: 'Times-Roman',
            fontStyle: 'italic',
            fontWeight: 'bold',
        },
        end: {
            fontSize: 20,
            color: 'blue',
            paddingLeft: 15,

            marginBottom: 15,
            marginTop: 15,
        }
    });

    const image = 'https://res.cloudinary.com/dk1eug9ms/image/upload/v1698655065/webImages/WhatsApp_Image_2023-10-30_at_12.58.54_lfseng.jpg'


    const [myDetail, setMyDetail] = useState({})
    const [course, setCourse] = useState({})
    useEffect(() => {
        const fetchStudentDetail = async () => {
            const responce = await studentInstance.get(`/myDetail`)
            console.log(responce, 'htsi is the respnce for certificate')
            setMyDetail(responce.data.studentData);
            setCourse(responce.data.course)
        }
        fetchStudentDetail()
    }, [])
    let endDay;
    let certificateApprove;
    let Name;
    let Subjects;
    let uName;
    let courseName;
    if (myDetail) {
        Name = myDetail.name
        Subjects = course.language;
        const today = new Date();
        endDay = course.endDate
        const endingDate = new Date(endDay);
        certificateApprove = today > endingDate;
        //uName = Name.toUpperCase();
        // courseName = Subjects.toUpperCase()
    }

    console.log(Name, 'this is the name')

    console.log(certificateApprove, 'this is the certifivate approve variable')

    const MyDocument = () => {
        return (
            <Document>
                <Page size={{ width: 700, height: 400 }} style={styles.page}>
                    <View style={styles.contentContainer}>
                        <View style={styles.header}>
                            {/* Use the imageUrl variable as the source */}
                            <Image style={styles.logo} src={image} />
                        </View>
                        <View style={styles.content}>
                            <Text style={styles.title}>CERTIFICATE</Text>
                            <Text style={styles.certificateText}>
                                This certificate acknowledges that  
                                <Text style={{ color: 'red',marginRight:5,marginLeft:5 }}> {Name} </Text>
                                 has shown great dedication and
                                successfully finished the  
                                <Text style={{ color: 'red',marginRight:5,marginLeft:5  }}> {Subjects} </Text> 
                                course on SpeakSphere.
                            </Text>
                            <Text style={styles.certificateText}> date issued :{endDay}</Text>
                            <Text style={styles.end}>SPEAK SPHERE Private Ltd</Text>
                        </View>
                    </View>
                </Page>
            </Document>
        );
    };

    const today = new Date();

    return (
        <div>
            <StudNav />
            <div className='h-screen'>
                <h1 className='text-black text-center font-bold'>My Certificate</h1>
                <div className="flex justify-center mt-4">
                   { myDetail && certificateApprove ? (
                        <div className="Certificate">
                          <h1 className='font-bold text-blue-800'>Certificate</h1>
                          <PDFDownloadLink document={<MyDocument />} fileName="certificate.pdf">
                            {({ loading }) => (loading ? 'Loading document...' : 'Download now!')}
                          </PDFDownloadLink>
                        </div>
                      ) : (
                        <div className="NoCertificate">
                          <p>You don't have any certificate at the moment.</p>
                        </div>
                      )}
                </div>
            </div>
        </div>
    )
}

export default Mycertificate
