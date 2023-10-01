import React,{useState, useEffect} from "react";
import axios from "axios";

import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue} from "@nextui-org/react";
import {users} from "./tags/data";

export default function App() {
    const [student, setStudentList] = useState([])

    useEffect(() => {
        const studentList = async () => {
            try {
                const respond = await axios.get(`http://localhost:4002/adminStudentList`);
                console.log(respond,'this is respond')
                setStudentList(respond.data);
            } catch (error) {
                console.error("Error fetching student list:", error);
            }
        };
        studentList()
    }, [])
    console.log(student,'this is variable')

  const [page, setPage] = React.useState(1);
  const rowsPerPage = 2;

  const pages = Math.ceil(student.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return student.slice(start, end);
  }, [page, student]);


  const handleUnblockUser = async(id)=>{
    console.log(id)
  }
  const handleBlockUser = async(id) =>{
    console.log(id)
  }
  const handleButtonClick = async(id)=>{
    console.log(id)
  }
  return (
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
          {item.is_blocked === false ? (
            <button
             className="bg-green-400 w-24 rounded-sm shadow-xl"
             onClick={() => handleUnblockUser(item._id)}>Unblock</button>
          ) : (
            <button
            className="bg-red-400 w-24  rounded-sm shadow-xl"
            onClick={() => handleBlockUser(item._id)}>Block</button>
          )}
        </TableCell>
        <TableCell>
        <button 
        
        onClick={() => handleButtonClick(item._id)}>Click Me</button>
      </TableCell>
        </TableRow>
      )}
    </TableBody>
    </Table>
  );
}
