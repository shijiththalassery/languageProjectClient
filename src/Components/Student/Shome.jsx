import React ,{useEffect} from 'react'
import StudentNavbar from './navbarFooter/StudentNavbar';
import { useNavigate } from 'react-router-dom';
import {
    CheckIcon,
    CloudUploadIcon,
    DatabaseIcon,
    PaperAirplaneIcon,
    ServerIcon,
    PhoneIcon,
    ArrowSmRightIcon,
    ChipIcon,
    SupportIcon
} from '@heroicons/react/solid';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function Shome() {

    useEffect(()=>{
        const token= localStorage.getItem("studentEmail")
        if(!token){
          navigate("/studentLogin")
        }
      })
    const navigate = useNavigate()
    const redirectTutuoList = async() =>{
        navigate('/tutorList')
    }
    return (

        <div>
            <StudentNavbar />
            <section>
                <div name='home' className='w-full h-screen bg-zinc-200 flex flex-col justify-between'>
                    <div className='grid md:grid-cols-2 max-w-[1240px] m-auto'>
                        <div className='flex flex-col justify-center md:items-start w-full px-2 py-8'>
                            <p className='text-2xl ml-2'>Adapt or become obsolete</p>
                            <h1 className=' ml-2 mr-2 -2 py-3 text-5xl md:text-7xl font-bold'>Start Learning Today &nbsp;
                                <Button
                                    variant="outlined"
                                    className="h-12 mr-2"
                                    style={{ borderColor: '#1d3b53', color: '#1d3b53' }}
                                    onClick={redirectTutuoList}
                                >
                                <PaperAirplaneIcon className='h-6  transform rotate-90' />
                                </Button>
                            </h1>
                            <p className='text-2xl'>The Power of Language </p>
                            <button className='py-3 px-6 sm:w-[60%] my-4'>    </button>
                        </div>
                        <div>
                            <img className='w-full' src={"https://github.com/fireclint/cloud-app-react/blob/main/src/assets/cyber-bg.png?raw=true"} alt="/" />
                        </div>
                        <div className='absolute flex flex-col py-8 md:min-w-[760px] bottom-[5%]
        mx-1 md:left-1/2 transform md:-translate-x-1/2 bg-zinc-200
        border border-slate-300 rounded-xl text-center shadow-xl'>
                            <p>Our  Services</p>
                            <div className='flex justify-between flex-wrap px-4'>
                                <p className='flex px-4 py-2 text-slate-500'><PaperAirplaneIcon className='h-6 text-indigo-600' />Interactive Lessons</p>
                                <p className='flex px-4 py-2 text-slate-500'><PaperAirplaneIcon className='h-6 text-indigo-600' />Community and Support</p>
                                <p className='flex px-4 py-2 text-slate-500'><PaperAirplaneIcon className='h-6 text-indigo-600' />Flexible Learning</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div name='about' className='w-full my-32'>
                    <div className='max-w-[1240px] mx-auto'>
                        <div className='text-center'>
                            <h2 className='text-5xl font-bold'>Trusted by developers across the world</h2>
                            <p className='text-3xl py-6 text-gray-500'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque asperiores earum placeat veritatis dignissimos itaque.</p>
                        </div>

                        <div className='grid md:grid-cols-3 gap-1 px-2 text-center'>
                            <div className='border py-8 rounded-xl shadow-xl' >
                                <p className='text-6xl font-bold text-indigo-600'>100%</p>
                                <p className='text-gray-400 mt-2'>Completion</p>
                            </div>
                            <div className='border py-8 rounded-xl shadow-xl' >
                                <p className='text-6xl font-bold text-indigo-600'>24/7</p>
                                <p className='text-gray-400 mt-2'>Delivery</p>
                            </div>
                            <div className='border py-8 rounded-xl shadow-xl' >
                                <p className='text-6xl font-bold text-indigo-600'>100K</p>
                                <p className='text-gray-400 mt-2'>Transactions</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div name='support' className='w-full mt-24'>
                    <div className='w-full h-[700px] bg-gray-900/90 absolute'>
                        <img className='w-full h-full object-cover mix-blend-overlay' src={"https://github.com/fireclint/cloud-app-react/blob/main/src/assets/support.jpg?raw=true"} alt="/" />
                    </div>

                    <div className='max-w-[1240px] mx-auto text-white relative'>
                        <div className='px-4 py-12'>
                            <h2 className='text-3xl pt-8 text-slate-300 uppercase text-center'>Support</h2>
                            <h3 className='text-5xl font-bold py-6 text-center'>Finding the right team</h3>
                            <p className='py-4 text-3xl text-slate-300'>Lorem ipsum dolor sit amet consectetur adipisicing elit. In repudiandae veritatis ratione error tenetur, voluptates architecto possimus ad! Omnis minima ea quidem quisquam unde beatae, minus illo et cum vel?</p>
                        </div>

                        <div className='grid grid-cols-1 lg:grid-cols-3 relative gap-x-8 gap-y-16 px-4 pt-12 sm:pt-20 text-black'>
                            <div className='bg-white rounded-xl shadow-2xl'>
                                <div className='p-8'>
                                    <PhoneIcon className='w-16 p-4 bg-indigo-600 text-white rounded-lg mt-[-4rem]' />
                                    <h3 className='font-bold text-2xl my-6'>Sales</h3>
                                    <p className='text-gray-600 text-xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi provident iure placeat blanditiis ea sint earum hic iste quibusdam exercitationem.</p>
                                </div>
                                <div className='bg-slate-100 pl-8 py-4'>
                                    <p className='flex items-center text-indigo-600'>Contact Us <ArrowSmRightIcon className='w-5 ml-2' /></p>
                                </div>
                            </div>
                            <div className='bg-white rounded-xl shadow-2xl'>
                                <div className='p-8'>
                                    <SupportIcon className='w-16 p-4 bg-indigo-600 text-white rounded-lg mt-[-4rem]' />
                                    <h3 className='font-bold text-2xl my-6'>Technical Support</h3>
                                    <p className='text-gray-600 text-xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi provident iure placeat blanditiis ea sint earum hic iste quibusdam exercitationem.</p>
                                </div>
                                <div className='bg-slate-100 pl-8 py-4'>
                                    <p className='flex items-center text-indigo-600'>Contact Us <ArrowSmRightIcon className='w-5 ml-2' /></p>
                                </div>
                            </div>
                            <div className='bg-white rounded-xl shadow-2xl'>
                                <div className='p-8'>
                                    <ChipIcon className='w-16 p-4 bg-indigo-600 text-white rounded-lg mt-[-4rem]' />
                                    <h3 className='font-bold text-2xl my-6'>Media Inquiries</h3>
                                    <p className='text-gray-600 text-xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi provident iure placeat blanditiis ea sint earum hic iste quibusdam exercitationem.</p>
                                </div>
                                <div className='bg-slate-100 pl-8 py-4'>
                                    <p className='flex items-center text-indigo-600'>Contact Us <ArrowSmRightIcon className='w-5 ml-2' /></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div name='platforms' className='w-full my-32'>
                <div className='max-w-[1240px] mx-auto px-2'>
                    <h2 className='text-5xl font-bold text-center'>All-In-One Platform</h2>
                    <p className='text-2xl py-8 text-gray-500 text-center'>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis,
                        ab. Officia sunt nulla aspernatur culpa, eaque tenetur excepturi
                        nostrum tempore.
                    </p>

                    <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4'>

                        <div className='flex'>
                            <div>
                                <CheckIcon className='w-7 mr-4 text-green-600' />
                            </div>
                            <div>
                                <h3 className='font-bold text-lg'>Notifications</h3>
                                <p className='text-lg pt-2 pb-4'>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    Asperiores maxime deserunt voluptatibus consequatur similique
                                    voluptates!
                                </p>
                            </div>
                        </div>
                        <div className='flex'>
                            <div>
                                <CheckIcon className='w-7 mr-4 text-green-600' />
                            </div>
                            <div>
                                <h3 className='font-bold text-lg'>Notifications</h3>
                                <p className='text-lg pt-2 pb-4'>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    Asperiores maxime deserunt voluptatibus consequatur similique
                                    voluptates!
                                </p>
                            </div>
                        </div>
                        <div className='flex'>
                            <div>
                                <CheckIcon className='w-7 mr-4 text-green-600' />
                            </div>
                            <div>
                                <h3 className='font-bold text-lg'>Notifications</h3>
                                <p className='text-lg pt-2 pb-4'>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    Asperiores maxime deserunt voluptatibus consequatur similique
                                    voluptates!
                                </p>
                            </div>
                        </div>
                        <div className='flex'>
                            <div>
                                <CheckIcon className='w-7 mr-4 text-green-600' />
                            </div>
                            <div>
                                <h3 className='font-bold text-lg'>Notifications</h3>
                                <p className='text-lg pt-2 pb-4'>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    Asperiores maxime deserunt voluptatibus consequatur similique
                                    voluptates!
                                </p>
                            </div>
                        </div>
                        <div className='flex'>
                            <div>
                                <CheckIcon className='w-7 mr-4 text-green-600' />
                            </div>
                            <div>
                                <h3 className='font-bold text-lg'>Notifications</h3>
                                <p className='text-lg pt-2 pb-4'>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    Asperiores maxime deserunt voluptatibus consequatur similique
                                    voluptates!
                                </p>
                            </div>
                        </div>
                        <div className='flex'>
                            <div>
                                <CheckIcon className='w-7 mr-4 text-green-600' />
                            </div>
                            <div>
                                <h3 className='font-bold text-lg'>Notifications</h3>
                                <p className='text-lg pt-2 pb-4'>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    Asperiores maxime deserunt voluptatibus consequatur similique
                                    voluptates!
                                </p>
                            </div>
                        </div>
                        <div className='flex'>
                            <div>
                                <CheckIcon className='w-7 mr-4 text-green-600' />
                            </div>
                            <div>
                                <h3 className='font-bold text-lg'>Notifications</h3>
                                <p className='text-lg pt-2 pb-4'>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    Asperiores maxime deserunt voluptatibus consequatur similique
                                    voluptates!
                                </p>
                            </div>
                        </div>
                        <div className='flex'>
                            <div>
                                <CheckIcon className='w-7 mr-4 text-green-600' />
                            </div>
                            <div>
                                <h3 className='font-bold text-lg'>Notifications</h3>
                                <p className='text-lg pt-2 pb-4'>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    Asperiores maxime deserunt voluptatibus consequatur similique
                                    voluptates!
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <section>
                <div name='pricing' className='w-full text-white my-24'>
                    <div className='w-full h-[800px] bg-slate-900 absolute mix-blend-overlay'></div>

                    <div className='max-w-[1240px] mx-auto py-12'>

                        <div className='text-center py-8 text-slate-300'>
                            <h2 className='text-3xl uppercase'>Pricing</h2>
                            <h3 className='text-5xl font-bold text-white py-8'>The right price for your research.</h3>
                            <p className='text-3xl'>
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia
                                laudantium odio ullam inventore aliquid ipsum quasi tenetur velit
                                voluptatum iste.
                            </p>
                        </div>

                        <div className='grid md:grid-cols-2'>

                            <div className='bg-white text-slate-900 m-4 p-8 rounded-xl shadow-2xl relative'>
                                <span className='uppercase px-3 py-1 bg-indigo-200 text-indigo-900 rounded-2xl text-sm'>Standard</span>
                                <div>
                                    <p className='text-6xl font-bold py-4 flex'>$49<span className='text-xl text-slate-500 flex flex-col justify-end'>/mo</span></p>
                                </div>
                                <p className='text-2xl py-8 text-slate-500'>Lorem ipsum dolor, sit amet consectetur adipisicing.</p>
                                <div className='text-2xl'>
                                    <p className='flex py-4'><CheckIcon className='w-8 mr-5 text-green-600' />Lorem, ipsum dolor.</p>
                                    <p className='flex py-4'><CheckIcon className='w-8 mr-5 text-green-600' />Lorem, ipsum dolor.</p>
                                    <p className='flex py-4'><CheckIcon className='w-8 mr-5 text-green-600' />Lorem, ipsum dolor.</p>
                                    <p className='flex py-4'><CheckIcon className='w-8 mr-5 text-green-600' />Lorem, ipsum dolor.</p>
                                    <p className='flex py-4'><CheckIcon className='w-8 mr-5 text-green-600' />Lorem, ipsum dolor.</p>
                                    <button className='w-full py-4 my-4'>Get Started</button>
                                </div>
                            </div>
                            <div className='bg-white text-slate-900 m-4 p-8 rounded-xl shadow-2xl relative'>
                                <span className='uppercase px-3 py-1 bg-indigo-200 text-indigo-900 rounded-2xl text-sm'>Premium</span>
                                <div>
                                    <p className='text-6xl font-bold py-4 flex'>$99<span className='text-xl text-slate-500 flex flex-col justify-end'>/mo</span></p>
                                </div>
                                <p className='text-2xl py-8 text-slate-500'>Lorem ipsum dolor, sit amet consectetur adipisicing.</p>
                                <div className='text-2xl'>
                                    <p className='flex py-4'><CheckIcon className='w-8 mr-5 text-green-600' />Lorem, ipsum dolor.</p>
                                    <p className='flex py-4'><CheckIcon className='w-8 mr-5 text-green-600' />Lorem, ipsum dolor.</p>
                                    <p className='flex py-4'><CheckIcon className='w-8 mr-5 text-green-600' />Lorem, ipsum dolor.</p>
                                    <p className='flex py-4'><CheckIcon className='w-8 mr-5 text-green-600' />Lorem, ipsum dolor.</p>
                                    <p className='flex py-4'><CheckIcon className='w-8 mr-5 text-green-600' />Lorem, ipsum dolor.</p>
                                    <button className='w-full py-4 my-4'>Get Started</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Shome
