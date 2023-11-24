import React, { useEffect, useState } from 'react'
import axios from 'axios';
import AdminNavbar from './AdminNavbar';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import instance from "../../api/adminInstance"
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue } from "@nextui-org/react";


export function AdminTutorList() {
    const [tutor, setTutorList] = useState([])
    useEffect(() => {
        const tutorList = async () => {
            const res = await instance.get(`/adminTutorList`)
            setTutorList(res.data)
        }
        tutorList()
    }, [tutor])

    const [page, setPage] = React.useState(1);
    const rowsPerPage = 2;

    const pages = Math.ceil(tutor.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return tutor.slice(start, end);
    }, [page, tutor]);


    const handleBlockUser = async (id) => {
        try {
            console.log('inside block user')

            const response = await instance.put(`/tutorBlock/${id}`)
            if (response.status === 200) {
                console.log(response)
                // const updatedTutor = tutor.map((i) =>
                //     i._id === id ? { ...i, is_blocked: true } : i
                // );
                toast.success("Tutor blocked successfully.");   
            } else {
                toast.error("Failed to block tutor. Please try again.");
            }
        } catch (error) {
            toast.error("Error blocking tutor. Please try again later.");
        }
    };
    const handleUnblockUser = async (id) => {
        try {
            // const response = await axios.put(`http://localhost:4002/tutorUnblock/${id}`);
            const response = await instance.put(`/tutorUnblock/${id}`)
            console.log(response)
            if (response.status === 200) {

                toast.success("Tutor unblocked successfully.");
            } else {
                toast.error("Failed to unblock tutor. Please try again.");
            }
        } catch (error) {
            toast.error("Error unblocking tutor. Please try again later.");
        }
    };

    const handleButtonClick = async (id) => {
        console.log(id)
    }
    return (
        <>
            <AdminNavbar />
            <Table
                aria-label="Example table with client side pagination"
                bottomContent={
                    <div className="flex w-full justify-center">
                        <Pagination
                            isCompact
                            showControls
                            showShadow
                            color="secondary"
                            page={page}
                            total={pages}
                            onChange={(page) => setPage(page)}
                        />
                    </div>
                }
                classNames={{
                    wrapper: "min-h-[222px]",
                }}
            >
                <TableHeader className="border border-black">
                    <TableColumn className="text-left" key="name">NAME</TableColumn>
                    <TableColumn key="email">Email</TableColumn>
                    <TableColumn key="_id">Detail</TableColumn>
                    <TableColumn key="is_blocked">ManageUser</TableColumn>

                </TableHeader>
                <TableBody items={items} className="border border-black">
                    {(item) => (
                        <TableRow key={item.name}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell>
                                {item.is_blocked == false ? (
                                    <button
                                        className="bg-green-400 w-24 rounded-sm shadow-xl"
                                        onClick={() => handleBlockUser(item._id)}>Unblock</button>
                                ) : (
                                    <button
                                        className="bg-red-400 w-24  rounded-sm shadow-xl text-sm"
                                        onClick={() =>handleUnblockUser (item._id)}>Block</button>
                                )}
                            </TableCell>
                            <TableCell>
                                <button
                                    onClick={() => handleButtonClick(item._id)}>Details</button>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    );
}