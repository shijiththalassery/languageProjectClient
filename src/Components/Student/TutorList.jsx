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
  Rating,
} from "@material-tailwind/react";

import Button from '@mui/material/Button';


function TutorList() {

  const navigate = useNavigate()

  const [currentPage, setCurrentPage] = useState(1);

  const [tutors, setTutors] = useState([]);

  console.log(tutors,'this is the tutors list')

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
        <div className="mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 md:mx-auto justify-center">
        {tutors.map((tutor) => (
          <div
            className="block mx-auto w-64 p-4 border rounded-md shadow-sm mb-4"
          >
            <img
              src={tutor.profilePhoto}
              alt={tutor.name}
              className="w-full h-32 object-cover rounded-md"
            />
            <div className="mt-2">
              <div className="text-lg font-semibold">{tutor.name}</div>
              <div className="text-gray-600 text-sm">
                <p>
                  <strong>Language:</strong> {tutor.language}
                </p>
                <p>
                  <strong>Price</strong> {tutor.price}
                </p>
                <p>
                  <strong>Total Review</strong> 
                </p>
                <Button
                  variant=""
                  className="block mx-auto"
                  style={{ borderColor: '#1d3b53', color: '#1d3b53' }}
                  onClick={() => { viewDetail(tutor._id) }}>View Detail</Button>
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
