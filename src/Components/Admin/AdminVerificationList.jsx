import React, { useEffect, useState } from 'react'
import AdminNavbar from './AdminNavbar';
import { verificationList } from '../../Services/Apis'
import CertificateViewer from './CertificateViewer';
import { SERVER } from '../../Services/helper';
import axios from 'axios';
import instance from '../../api/adminInstance'

function AdminVerificationList() {
    const [showCertificate, setShowCertificate] = useState(false);

    const viewCertificate = () => {
      setShowCertificate(true);
    };
  
    const hideCertificate = () => {
      setShowCertificate(false);
    };
    const tutorList = async () => {
        try {
           // const res = await verificationList();
            const res = await instance.get(`/verificationList`)
            setVerification(res.data.data);
        } catch (error) {
            console.error("Error fetching tutor list:", error);
        }
    };
    const [verification, setVerification] = useState([])
    useEffect(() => {
        const tutorList = async () => {
            try {
             
                const res = await instance.get(`/verificationList`)
                setVerification(res.data.data);
            } catch (error) {
                console.error("Error fetching tutor list:", error);
            }
        };

        tutorList();
    }, []);

    const approve = async (id) => {
        try {
         // const response = await axios.put(`http://localhost:4002/certificateApprove/${id}`);
          const response = await instance.put(`/certificateApprove/${id}`)
          if (response.status === 200) {
            tutorList();
          }
        } catch (error) {
          console.error("Error approving certificate:", error);
        }
      }

    const Reject = async(id)=>{
        //const response = await axios.put(`http://localhost:4002/certificateReject/${id}`);
        const response = await instance.put(`/certificateReject/${id}`)
        console.log(response,'this is the responce of reject')
        if(response.status === 200){
            tutorList();
        }
    }
 
    return (
        <>
            <AdminNavbar />
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead >
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th >Name</th>
                            <th >Language</th>
                            <th>View Profile</th>
                            <th>Approve</th>
                            <th>Reject</th>
                        </tr>
                    </thead>
                    <tbody>
                        {verification.map((t)=>(
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <td>
                                <div className="flex items-center space-x-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={t?.profilePhoto} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{t?.name}</div>
                                        <div className="text-sm opacity-50"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {t.language}
                                <br />
                                <span className="badge badge-ghost badge-sm">language</span>
                            </td>
                            <td>
                            <div>
                            <button className="btn btn-ghost btn-xs" onClick={viewCertificate}>
                              View
                            </button>
                      
                            {showCertificate && (
                              <div>
                                <CertificateViewer certificateUrl={t.certificate} onClose={hideCertificate} />
                                <button onClick={hideCertificate}>Close</button>
                              </div>
                            )}
                          </div>
                            </td>
                            <th><button className="btn btn-ghost btn-xs bg-green-300 " onClick={()=>approve(t._id)}>Approve</button>
                            </th>
                            <th><button className="btn btn-ghost btn-xs bg-red-300 " onClick={()=>Reject(t._id)}>Reject</button>
                            </th>
                        </tr>
                        ) )}
                    </tbody>
                    {/* foot */}


                </table>
            </div>
        </>
    )
}

export default AdminVerificationList
