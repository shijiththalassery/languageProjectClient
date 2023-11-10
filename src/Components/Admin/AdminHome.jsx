import React, { useState } from 'react'
import AdminNavbar from './AdminNavbar';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { Listbox } from '@headlessui/react';


export default function AdminHome() {

  const [selectedOption, setSelectedOption] = useState('option1');

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className='w-full h-full'>
      <div className='w-screen h-auto bg-blue-200'>

      <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 gap-2 pt-2 pb-2 border border-black'>
      </div>

        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 gap-2 pt-2 pb-2 border border-black'>

          <div className='mx-auto border md:col-span-1 border-blue-500 w-max bg-blue-200 hover:bg-blue-300 transform hover:scale-105 transition duration-300 ease-in-out'>

            <div className='w-max  h-1/2 p-4'>
              <p className="text-center text-blue-900 font-bold"><b>Total Students: 12</b></p>
            </div>
          </div>

          <div className='mx-auto border md:col-span-1 h-3/4 border-black bg-yellow-200 hover:bg-yellow-300 transform hover:scale-105 transition duration-300 ease-in-out'>

            <div className='w-auto h-auto p-4'>
              <p className="text-center text-yellow-900 font-bold"><b>Total Students: 12</b></p>
            </div>
          </div>

          <div className='mx-auto border md:col-span-1 border-black bg-green-200 hover:bg-green-300 transform hover:scale-105 transition duration-300 ease-in-out'>

            <div className='w-auto h-auto p-4'>
              <p className="text-center text-green-900 font-bold"><b>Active Students: 3</b></p>
            </div>
          </div>

          <div className='mx-auto border md:col-span-1 border-black bg-red-200 hover:bg-red-300 transform hover:scale-105 transition duration-300 ease-in-out'>

            <div className='w-auto h-auto p-4'>
              <select
                className="block w-full mt-2 border border-gray-300 rounded-lg py-2 pl-3 pr-10 focus:outline-none focus:ring focus:border-blue-300"
                value={selectedOption}
                onChange={handleOptionChange}
              >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>
          </div>
        </div>

        <div className=' grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4'>

          <div className='col-span-1 md:col-span-2 sm:col-span-1 sm:mx-auto '>
            <h1 className='text-center'><b>STUDENTS PER MONTH</b></h1>
            <BarChart
              xAxis={[
                {
                  id: 'barCategories',
                  data: ['bar A', 'bar B', 'bar C'],
                  scaleType: 'band',
                },
              ]}
              series={[
                {
                  data: [2, 5, 3],
                },
              ]}
              width={500}
              height={300}
            />
          </div>
          <div className='col-span-1 md:col-span-2 sm:col-span-1 sm:mx-auto '>
            <h1 className='text-center'><b>MONEY PER MONTH</b></h1>
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 10, label: 'series A' },
                    { id: 1, value: 15, label: 'series B' },
                    { id: 2, value: 20, label: 'series C' },
                  ],
                },
              ]}
              width={400}
              height={200}
            />
          </div>

        </div>

        <div className=' grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4'>

          <div className='col-span-1 md:col-span-2 sm:col-span-1 sm:mx-auto '>
            <h1 className='text-center'><b>STUDENTS PER MONTH</b></h1>
            <BarChart
              xAxis={[
                {
                  id: 'barCategories',
                  data: ['bar A', 'bar B', 'bar C'],
                  scaleType: 'band',
                },
              ]}
              series={[
                {
                  data: [2, 5, 3],
                },
              ]}
              width={500}
              height={300}
            />
          </div>
          <div className='col-span-1 md:col-span-2 sm:col-span-1 sm:mx-auto '>
            <h1 className='text-center'><b>MONEY PER MONTH</b></h1>
            <LineChart
              xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
              series={[
                {
                  data: [2, 5.5, 2, 8.5, 1.5, 5],
                },
              ]}
              width={500}
              height={300}
            />
          </div>

        </div>
      </div>
    </div>
  )
}
