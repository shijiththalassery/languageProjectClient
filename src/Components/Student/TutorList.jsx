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
} from "@material-tailwind/react";
import StarRatings from 'react-star-ratings';
import Button from '@mui/material/Button';
import StudNav from './StudNav';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import stduentInstance from "../../api/studentInstace"


function TutorList() {

  const navigate = useNavigate()

  const [value, setValue] = useState("3.4")
  const [currentPage, setCurrentPage] = useState(1);
  const [tutors, setTutors] = useState([]);
  const [languages, setLanguageList] = useState([]);
  const [tutorsPerPage] = useState(1);
  const [sortTypes, setSortTypes] = useState([]);
  const [search, setSearch] = useState("");
  const [langTypes, setLangTypes] = useState("");

  const [sort, setSort] = useState([])



  // console.log(langTypes, ' thsi si the language type,which means caegory ');
  // console.log(tutors, 'this is the tutors list')
  // console.log(sortTypes, 'this is the type of the sort')





  const indexOfLastTutor = currentPage * tutorsPerPage;
  const indexOfFirstTutor = indexOfLastTutor - tutorsPerPage;
  const currentTutors = tutors.slice(indexOfFirstTutor, indexOfLastTutor);

  const handleSelection = async (
    search,
    langTypes,
    sortTypes
  ) => {
    try {
      // let url = "http://localhost:4002/tutorList"
     let url = "/tutorList"
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
     // const response = await axios.get(url);
      const response = await stduentInstance.get(url);
  
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

  const handleSortTypeChange = async (type) => {

    let updatedSortTypes = "";
    if (sortTypes === type) {
      updatedSortTypes = "";
    } else {
      updatedSortTypes = type;
    }
    setSortTypes(updatedSortTypes);
    console.log(sortTypes, 'this is sort type')
    alert(sortTypes)
    await handleSelection(search,
      langTypes,
      type)
  }


  const handleCategory = async (e) => {

    e.preventDefault()
    setLangTypes(e.target.value)
    const langTypes = e.target.value
    await handleSelection(search,
      langTypes,
      sortTypes)

  }

  // console.log(languages, 'this is language list from shijth')

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
        //const response = await tutorList();
        const response = await stduentInstance.get(`/tutorList`)
        setTutors(response.data);
      } catch (error) {
        console.error("Error fetching tutor list:", error);
      }
    };
    fetchTutors();
  }, []);

  console.log(tutors, 'testing one two three')



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
  }, [search, langTypes, sortTypes, currentPage]);

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

  function calculateAverageRating(reviews) {
    if (reviews.length === 0) {
      return 0; // Handle the case where there are no reviews.
    }
    const totalStars = reviews.reduce((total, review) => total + review.stars, 0);
    return totalStars / reviews.length;
  }

  const [sortOptions, setSortOptions] = useState({
    ascending: false,
    descending: false,
  });


  const [selectedOptions, setSelectedOptions] = useState('');
  const handleSelectChanges = async (event) => {
    const sortTypes = event.target.value;
    setSelectedOptions(sortTypes)
    await handleSelection(search,
      langTypes,
      sortTypes)
  };
  return (
    <div className='w-full '>
      <div className='w-full '>
        <StudNav />
      </div>
      <div className="w-full ">
        <div className=" rounded-lg shadow-lg w-full bg-blue-400  flex justify-end ">
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
                  className="form-control border  rounded-sm shadow-md"
                  type="search"
                  placeholder="  Search Tutor"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button className=" w-16 shadow-lg bg-white" type="submit">
                  Search
                </button>
              </div>
            </form>
          </div>
          <div className="mr-20">
            <label className="block text-sm font-medium"><b>Filter by Category:</b></label>
            <select className="w-full border rounded-md mr-2 mb-1 shadow-lg"
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
            <label className="block text-sm font-medium"><b>Sort by:</b></label>
            <select
              className="w-full  border rounded-md mr-2 shadow-xl"
              value={selectedOptions}
              onChange={handleSelectChanges}
            >
              <option value="" >Price</option>
              <option value="Ascending">Low-High</option>
              <option value="Descending">High-Low</option>
            </select>
          </div>

        </div>
        <div className="mx-auto mt-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 md:mx-auto justify-center">
          {tutors.length === 0 ? (
            <div className="flex items-center justify-center w-screen h-max border ">
              <div className="w-2/3 h-full">
                <img src="https://cdn.dribbble.com/userupload/2905384/file/original-93c7c3593e7d733ddd8ca2fd83ac0ed4.png?resize=752x" alt="No results" />
              </div>
            </div>

          ) : (
            tutors.map((tutor) => (
              <div
              key={tutor._id}
              className={`block mx-auto w-64 p-4 border rounded-md shadow-sm mb-4 ${
                tutor.is_premium ? ' border-2 border-yellow-500' : 'border-2 border-gray-300'
              }`}
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
                      <strong>Price:</strong> {tutor.price}
                    </p>
                    <p>
                      <strong>Total Review</strong>
                    </p>
                    <div>
                      <StarRatings
                        rating={calculateAverageRating(tutor.reviews)}
                        starDimension="15px"
                        starSpacing="3px"
                      />
                    </div>
                    <Button
                      variant=""
                      className="block mx-auto"
                      style={{ borderColor: '#1d3b53', color: '#1d3b53' }}
                      onClick={() => {
                        viewDetail(tutor._id);
                      }}
                    >
                      View Detail
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
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
