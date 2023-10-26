import React, { useState, useEffect } from 'react';
import StudentNavbar from './navbarFooter/StudentNavbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { tutorList } from '../../Services/Apis';
import { languageList } from '../../Services/Apis';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Rating,
} from "@material-tailwind/react";




function TutorList() {

  const navigate = useNavigate()

  const [currentPage, setCurrentPage] = useState(1);

  const [tutors, setTutors] = useState([]);

  const [languages, setLanguageList] = useState([]);

  const [search, setSearch] = useState(""); // Search term
  const [langTypes, setLangTypes] = useState(""); // Selected car types
  console.log(langTypes, ' thsi si the language type,which means caegory ');


  // const [currentPage, setCurrentPage] = useState(1);
  const [tutorsPerPage] = useState(1); // Set the number of cars per page
  const [sortTypes, setSortTypes] = useState([]);
  console.log(sortTypes, 'this is the type of the sort')

  const indexOfLastTutor = currentPage * tutorsPerPage;
  const indexOfFirstTutor = indexOfLastTutor - tutorsPerPage;
  const currentTutors = tutors.slice(indexOfFirstTutor, indexOfLastTutor);

  const handleSelection = async (
    search,
    langTypes,
    sortTypes
  ) => {
    console.log('inside fucntion ')
    console.log(search, 'this is the search from fucntion ')
    try {
      let url = "http://localhost:4002/tutorList"
      if (search) {
        url += `?search=${search}`;
      }
      if (langTypes) {
        url += search ? `&langTypes=${langTypes}` : `?langTypes=${langTypes}`;
      }
      if (sortTypes) {
        url +=
          search || langTypes
            ? `&sortTypes=${sortTypes}`
            : `?sortTypes=${sortTypes}`;
      }
      const response = await axios.get(url);
      console.log("Response from backend:", response.data);
      if (Array.isArray(response.data)) {
        setTutors(response.data);
      }

    } catch (error) {
      console.error(error)
    }
  }
  const handleSearch = async () => {

    console.log('inside handle search')

    await handleSelection(search,
      langTypes,
      sortTypes)
  }

  const handleSort = async (e) => {

    e.preventDefault();
    setSortTypes(e.target.value)

    await handleSelection(search,
      langTypes,
      sortTypes)

  }


  const handleCategory = async (e) => {

    e.preventDefault()
    setLangTypes(e.target.value)

    await handleSelection(search,
      langTypes,
      sortTypes)

  }

  console.log(languages, 'this is language list from shijth')

  useEffect(() => {
    const token = localStorage.getItem("studentEmail")
    if (!token) {
      navigate("/studentLogin")
    }
  })


  const itemsPerPage = 1;


  const totalPage = Math.ceil((tutors.length) / itemsPerPage);

  const displayData = tutors.filter((item, index) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return index >= startIndex && index < endIndex;
  });

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await tutorList();
        setTutors(response.data);
      } catch (error) {
        console.error("Error fetching tutor list:", error);
      }
    };
    fetchTutors();
  }, [sortTypes, langTypes]);



  useEffect(() => {
    const fetchLanguageList = async () => {
      try {
        const response = await languageList();

        setLanguageList(response.data.language);
      } catch (error) {
        console.error("Error fetching language list:", error);
      }
    };

    fetchLanguageList();
  }, []);

  const viewDetail = async (id) => {
    console.log(id);
    navigate(`/tutorDetail/${id}`)
  }

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1)
  }

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1)
  }
  return (
    <div className='w-full '>
      <div className='w-full '>
        <StudentNavbar />
      </div>
      <div className="w-full ">
        <div className=" rounded-lg shadow-lg w-full bg-blue-500  flex justify-end ">
          <div className="mt-5 mb-1 mr-12">
            <form
              className="col-lg-4 mb-3"
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
            >
              <div className="input-group">
                <input
                  className="form-control border border-black"
                  type="search"
                  placeholder="Search Tutor"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button className=" border border-black w-16" type="submit">
                  Search
                </button>
              </div>
            </form>
          </div>
          <div className="mr-20">
            <label className="block text-sm font-medium">Filter by Category:</label>
            <select className="w-full border rounded-md mr-2 mb-1"
              onChange={handleCategory}>
              <option value="">All</option>
              {languages.map((languageObject, index) => (
                <option key={index} value={languageObject.language}
                >
                  {languageObject.language}
                </option>
              ))}
            </select>
          </div>
          <div className='mr-8'>
            <label className="block text-sm font-medium">Sort by:</label>
            <select
              className="w-full  border rounded-md mr-2"
              onChange={handleSort}
            >
              <option value="">Price</option>
              <option value="ascending">Low-High</option>
              <option value="descending">High-Low</option>
            </select>
          </div>
        </div>
        <div className="w-screen flex flex-wrap justify-center items-start mt-4 mb-2">
          {tutors.map((tutor) => (
            // <Card key={tutor._id} className="w-full max-w-[18rem] h-[24rem] shadow-lg mb-2 border border-black">
            //   <CardHeader floated={false} color="blue-gray">
            //     <img
            //       src={tutor.profilePhoto} // Use the tutor's image URL
            //       alt="Tutor profile"
            //     />
            //     <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
            //   </CardHeader>
            //   <CardBody className="flex flex-col items-center justify-center">
            //     <div className='shadow-lg rounded pl-10 pr-10 pb-2'>
            //       <div className="mb-3 flex items-center justify-center">
            //         <Typography variant="h5" color="blue-gray" className="font-medium">
            //           {tutor.name} {/* Display tutor's name */}
            //         </Typography>
            //       </div>
            //       <div className="mb-3 flex">
            //         <Typography component="legend" className="mr-2">
            //           Rating
            //         </Typography>
            //         <Rating name="read-only" value={tutor.rating} readOnly style={{ display: 'flex', flexDirection: 'row' }} />
            //       </div>
            //       <div className="mt-3 flex items-center justify-center">
            //         <Typography variant="h5" color="blue-gray" className="font-medium">
            //           ₹ {tutor.price} {/* Display tutor's price */}
            //         </Typography>
            //       </div>
            //       <div className="mt-3 flex items-center justify-center">
            //         <Typography variant="h5" color="blue-gray" className="font-medium">
            //           {tutor.language} {/* Display tutor's language */}
            //         </Typography>
            //       </div>
            //     </div>
            //     <CardFooter className="pt-1 text-blue-700">
            //       <Button size="lg" fullWidth={true} className="text-blue-700 w-24 h-8 border border-black"
            //         onClick={() => { viewDetail(tutor._id) }}>
            //         Join Now
            //       </Button>
            //     </CardFooter>
            //   </CardBody>
            // </Card>
            <div className="max-w-sm w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-4">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                  className="w-full h-32 object-cover object-center"
                  src={tutor?.profilePhoto}
                  alt="Person's Name"
                />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{tutor?.name} </div>
                  <p className="text-gray-700 text-base">{tutor?.language}</p>
                  <p className="text-gray-700 text-base">{tutor?.price}</p>
                </div>
                <div className="px-6 py-4">
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                    onClick={() => { viewDetail(tutor._id) }}
                  >
                    Click Me
                  </button>
                </div>
                <div className="px-6 py-4">
                  <Rating name="read-only" value={tutor.rating} readOnly style={{ display: 'flex', flexDirection: 'row' }} />
                </div>
              </div>
            </div>


          ))}
        </div>
        <div className="w-full flex justify-center mt-4">
          <nav className="block">
            <ul className="flex pl-0 rounded list-none flex-wrap">

              <li>
                <a
                  href="#page1" className="block px-3 py-2 rounded text-blue-500 bg-white hover:bg-blue-500 hover:text-white"
                  disabled={currentPage === 1}
                  onClick={handlePrevPage}
                >previous</a>
              </li>

              <li>
                <a href="#page2" className="block px-3 py-2 rounded text-blue-500 bg-white hover:bg-blue-500 hover:text-white"

                  disabled={currentPage === totalPage}
                  onClick={handleNextPage}
                >next</a>
              </li>

            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default TutorList;
