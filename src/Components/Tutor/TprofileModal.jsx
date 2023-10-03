import React,{useEffect , useState  } from 'react'

function TProfileModal({visible,onClose, tutorDetails}) {

  const [name,setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');

  const tutorInf = tutorDetails;

    if (!visible) return null;
    const handleOnClose = (e) => {
        if(e.target.id === 'container') onClose()
        
    }

    const editDetail = async() => {
        const data = {
          name: name ?name: tutorInf.name,
          email:email ?email : tutorInf.email,
          phone: phone ? phone : tutorInf.phone,
          password: password?password : tutorInf.password,
          confPassword :confPassword ? confPassword :tutorInf.password,
        }
        const userData = JSON.stringify(data);
    }
    console.log(tutorInf, 'this is tutor info')
  return (
        <div
        id='container'
        onClick={handleOnClose}
        className= "  fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center">
        <div className="bg-white p-2 rounded w-72">
        <h1 className="font-semibold text-center text-xl text-gray-700">
          Welcome back
        </h1>
        <p className="text-center text-gray-700 mb-5">Sign in</p>

        <div className="flex flex-col">
          <input
            type="text"
            className="border border-gray-700 p-2 rounded mb-5"
            placeholder={tutorInf.name}
            onChange={(e)=>setName(e.target.value)}
          />
          <input
            type="number"
            className="border border-gray-700 p-2 rounded mb-5"
            placeholder={tutorInf.phone}
            onChange={(e)=>setPhone(e.target.value)}
          />
          <input
          type="email"
          className="border border-gray-700 p-2 rounded mb-5"
          placeholder={tutorInf.email}
          onChange={(e)=>setEmail(e.target.value)}
          />
          <input
          type="password"
          className="border border-gray-700 p-2 rounded mb-5"
          placeholder="Enter your password"
          onChange={(e)=>setPassword(e.target.value)}
          />
          <input
          type="Password"
          className ="border border-gray-700 p-2 rounded mb-5"
          placeholder ="Enter your Confirm Password"
          onChange={(e)=>setConfPassword(e.target.value)}
          />
        </div>
        <div className="text-center">
          <button onClick={onClose} className="px-5 py-2 bg-gray-700 text-white rounded">
            Reset
          </button>
        </div>
      </div>
        </div>
  )
}

export default TProfileModal