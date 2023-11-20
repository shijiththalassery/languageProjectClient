import React, { useState, useEffect } from 'react'
import AdminNavbar from './AdminNavbar';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { Listbox } from '@headlessui/react';
import instance from '../../api/adminInstance';
import '../../App.css'



export default function AdminHome() {

  const [studentPerLanguage, setStudentPerLanguage] = useState([]);
  const [tutorPerLanguage, setTutorPerLanguage] = useState([]);
  const [studentJoinPerMonth, setStudentJoinPerMonth] = useState([]);
  const [monthlyTotalPrice, setMonthlyTotalPrice] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState();
  const [thisMonthRevenue, setThisMonthRevenue] = useState();
  const [premiumTutors, setPremiumTutors] = useState();
  const [totalStduent, setTotalStudent] = useState();
  const [totalTutors, setTotalTutors] = useState();

  const [selectedOption, setSelectedOption] = useState('option1');

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  

  useEffect(() => {
    const chartData = async () => {
      const response = await instance.get(`/getChartData`)
      if (response) {
        setStudentPerLanguage(response.data.studentPerLanguage)
        setTutorPerLanguage(response.data.tutorPerLanguage)
        setStudentJoinPerMonth(response.data.studentPerMonthjoin)
        setMonthlyTotalPrice(response.data.monthlyTotalPrice)
        setTotalRevenue(response.data.overeallTotalPrice)
        setTotalTutors(response.data.overallTotalTutors)
        setTotalStudent(response.data.overallTotalStudents)
        setPremiumTutors(response.data.premiumTutors)
        setThisMonthRevenue(response.data.thisMonthRevenue)
      }
    }
    chartData()
  }, [])

  let months = [];
  let totalStudents = []
  let pieChartData
  let tutorPerLanguageList

  if (studentPerLanguage && studentPerLanguage.length > 0) {
    pieChartData = studentPerLanguage.map((item, index) => ({
      id: index,
      value: item.arrayLength,
      label: item.language,
    }));
  }

  if (tutorPerLanguage && tutorPerLanguage.length > 0) {
    tutorPerLanguageList = tutorPerLanguage.map((item, index) => ({
      id: index,
      value: item.arrayLength,
      label: item.language,
    }));
  }

  if (studentJoinPerMonth && studentJoinPerMonth.length > 0) {
    months = studentJoinPerMonth.map(item => item.month);
    totalStudents = studentJoinPerMonth.map(item => item.totalStudents);

  }

  let totalPriceInMonth = []

  if (monthlyTotalPrice && monthlyTotalPrice.length > 0) {
    totalPriceInMonth = monthlyTotalPrice.map((item) => item.total)
  }


  let totalProfit;
  let thisMonthProfit;

  if(totalRevenue && thisMonthRevenue){
    const premiumTutorsValue = premiumTutors || 0;
    totalProfit =parseInt( ( totalRevenue * 0.15 ) + ( premiumTutorsValue * 990 ))
    thisMonthProfit = thisMonthRevenue * 0.15
  }

  return (
    <div className='w-full h-full'>
      <div className='w-screen h-auto '>

        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 gap-2 pt-2 pb-2 border border-black'>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 gap-2 pt-2 pb-2 border border-black'>

          <div className='mx-auto border md:col-span-1 border-blue-500 w-60 bg-blue-200 hover:bg-blue-300 transform hover:scale-105 transition duration-300 ease-in-out flip-card rounded-md shadow-lg'>
            <div className='flip-card-inner'>
              <div className='w-max h-1/2 p-4'>
                <p className="text-center text-blue-900 font-bold"><b>Total Tutor:{totalTutors && totalTutors} </b></p>
                <p className="text-center text-blue-900 font-bold"><b>Total Students:{totalStduent && totalStduent} </b></p>
              </div>
            </div>
          </div>


          <div className='mx-auto border md:col-span-1 border-yellow-500 w-60 bg-yellow-200 hover:bg-yellow-300 transform hover:scale-105 transition duration-300 ease-in-out flip-card rounded-md shadow-lg'>
            <div className='flip-card-inner'>
              <div className='w-max h-1/2 p-4'>
                <p className="text-center text-yellow-900 font-bold"><b>Premium Tutor: {premiumTutors ? premiumTutors : 0}</b></p>
              </div>
            </div>
          </div>


          <div className='mx-auto border md:col-span-1 border-green-500 w-60 bg-green-200 hover:bg-green-300 transform hover:scale-105 transition duration-300 ease-in-out flip-card  rounded-md shadow-lg'>
            <div className='flip-card-inner'>
              <div className='w-max h-1/2 p-4'>
                <p className="text-center text-green-900 font-bold"><b>This Month Revenue:{ thisMonthRevenue && thisMonthRevenue } </b></p>
                <p className="text-center text-green-900 font-bold"><b>Total Revenue:{ totalRevenue && totalRevenue }</b></p>
              </div>
            </div>
          </div>

          <div className='mx-auto border md:col-span-1 border-red-500 w-60 bg-red-200 hover:bg-red-300 transform hover:scale-105 transition duration-300 ease-in-out flip-card rounded-md shadow-lg'>
            <div className='flip-card-inner'>
              <div className='w-max h-1/2 p-4'>
                <p className="text-center text-red-900 font-bold"><b>Total Profit:{totalProfit && totalProfit} </b></p>
                <p className="text-center text-red-900 font-bold"><b>This Month Profit:{thisMonthProfit && thisMonthProfit} </b></p>
              </div>
            </div>
          </div>
        </div>

        <div className=' grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4'>

          <div className='col-span-1 md:col-span-2 sm:col-span-1 sm:mx-auto  '>
            <h1 className='text-center mt-8'><b>STUDENTS PER MONTH</b></h1>
            {studentJoinPerMonth && studentJoinPerMonth.length > 0 ? (
              <BarChart
                xAxis={[
                  {
                    id: 'months',
                    data: months,
                    scaleType: 'band',
                  },
                ]}
                series={[
                  {
                    data: totalStudents,
                  },
                ]}
                width={500}
                height={300}
              />
            ) : (
              <p>No data available</p>
            )}
          </div>
          <div className='col-span-1 md:col-span-2 sm:col-span-1 sm:mx-auto mt-8  '>
            <h1 className='text-center '><b>STUDENT PER LANGUAGE</b></h1>
            <div className='mt-12'>
              {studentJoinPerMonth && studentJoinPerMonth.length > 0 ? (
                <PieChart
                  series={[
                    {
                      data: pieChartData
                    },
                  ]}
                  width={400}
                  height={200}
                />
              ) : (
                <p>No data available</p>
              )}
            </div>
          </div>

        </div>

        <div className=' grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4'>

          <div className='col-span-1 md:col-span-2 sm:col-span-1 sm:mx-auto '>

            {studentJoinPerMonth && studentJoinPerMonth.length > 0 ? (
              <LineChart
                xAxis={[
                  {
                    id: 'Years',
                    data: months,
                    scaleType: 'band',
                  },
                ]}
                series={[
                  {
                    id: 'France',
                    label: 'TOTAL MONEY PER MONTH',
                    data: totalPriceInMonth,
                    stack: 'total',
                    area: true,
                    showMark: false,
                  },
                ]}
                width={500}
                height={300}
                margin={{ left: 70 }}
              />
            ) : (
              <p>No data available</p>
            )}
          </div>
          <div className='col-span-1 md:col-span-2 sm:col-span-1 sm:mx-auto mt-4 '>
            <h1 className='text-center'><b>TUTOR PER LANGUAGE</b></h1>
            <div className='mt-4'>
              {studentJoinPerMonth && studentJoinPerMonth.length > 0 ? (
                <PieChart
                  series={[
                    {
                      data: tutorPerLanguageList
                    },
                  ]}
                  width={400}
                  height={200}
                />
              ) : (
                <p>No data available</p>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
