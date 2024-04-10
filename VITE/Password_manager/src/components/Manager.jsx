import { v4 as uuidv4 } from 'uuid'
import { useEffect, useState, useRef } from 'react'


const Manager = () => {
    const [passwordArray, setPasswordArray] = useState([])
    const [passtogle, setPasstogle] = useState(true)
    const [crud, setCrud] = useState(false)
    const [webSiteDetails, setWebSiteDetails] = useState({
        url: '',
        username: '',
        password: '',
    })
    useEffect(() => {
        let password = localStorage.getItem('WebSiteDetails')
        if (password) {
            setPasswordArray(JSON.parse(password))
        }
    }, [])
    const handleDelete = (id) => {
        const updatedArray = passwordArray.filter(items => items.id != id)
        setPasswordArray(updatedArray)
        localStorage.setItem("WebSiteDetails", JSON.stringify(updatedArray))
    }
    const ref = useRef()
    const handleShowPassword = () => {
        if (ref.current.src.includes("src/assets/visibility_off_FILL0_wght400_GRAD0_opsz24.svg")) {
            ref.current.src = "src/assets/visibility_FILL0_wght400_GRAD0_opsz24.svg"
        }
        else {
            ref.current.src = "src/assets/visibility_off_FILL0_wght400_GRAD0_opsz24.svg"
        }
        setPasstogle(!passtogle)
    }
    const handleChange = (e) => {
        setWebSiteDetails({ ...webSiteDetails, [e.target.name]: e.target.value })

    }
    const handleSavePassword = (e) => {
        if (webSiteDetails.url !== '' && webSiteDetails.password !== '' && webSiteDetails.username !== '') {
            setPasswordArray([...passwordArray, { ...webSiteDetails, id: uuidv4() }])
            setWebSiteDetails({
                url: '',
                username: '',
                password: '',
            })
            localStorage.setItem("WebSiteDetails", JSON.stringify([...passwordArray, { ...webSiteDetails, id: uuidv4() }]))
            setCrud(true)
        }

    }
    const handleCopy = (e) => {
        navigator.clipboard.writeText(e)
    }

    const handleEdit = (id) => {
        setWebSiteDetails(passwordArray.filter(items => items.id === id)[0])
        const updatedArray = passwordArray.filter(items => items.id != id)
        setPasswordArray(updatedArray)
    }

    return (
        <>
            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#f0f0f0_2px,transparent_2px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,transparent)]"></div></div>
            <div className='mx-auto max-w-4xl py-10'>
                <div className='flex justify-center gap-4 flex-col m-auto w-[80%]'>
                    <div>
                        <div className='text-2xl font-bold text-center'>
                            <span className='text-green-500'>&lt;</span>
                            <span>Pass</span>
                            <span className='text-green-500'>OP/&gt;</span>
                        </div>
                        <div className='text-lg text text-green-700 font-semibold text-center'>Your own Password Manager</div>
                    </div>
                    <input type="text" placeholder='Enter Website URL' name='url' value={webSiteDetails.url} onChange={handleChange} className='rounded-full shadow-sm shadow-black border border-green-500 box-border px-4 py-1 text-gray-800 font-medium' />
                    <div className=' flex gap-4'>
                        <input placeholder='Enter Username' name='username' value={webSiteDetails.username} onChange={handleChange} className='rounded-full shadow-sm shadow-black border w-full border-green-500 box-border px-4 py-1 text-gray-800 font-medium' type="text" />
                        <div className='relative'>
                            <input placeholder='Enter Password' name='password' value={webSiteDetails.password} onChange={handleChange} className='rounded-full shadow-sm shadow-black border w-full border-green-500 box-border px-4 pr-7 py-1 text-gray-800 font-medium' type={passtogle ? "password" : "text"} />
                            <span className='absolute top-[6px] right-1.5'><img ref={ref} className='rounded-full cursor-pointer w-5 h-6 bg-white' src="src/assets/visibility_off_FILL0_wght400_GRAD0_opsz24.svg" alt="eye" onClick={handleShowPassword} /></span>
                        </div>
                    </div>
                    <div className='flex justify-end'>
                        <button onClick={handleSavePassword} className='flex justify-center items-center border px-3 py-[2px] gap-2 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 text-sm'>
                            <lord-icon
                                src="https://cdn.lordicon.com/jgnvfzqg.json"
                                trigger="hover">
                            </lord-icon>
                            <span>Save</span>
                        </button>
                    </div>
                </div>
            </div>
            <div id="webSiteUrl" className='flex flex-col justify-center items-center relative'>
                <h2 className='text-xl font-bold text-emerald-900' >Your Passwords</h2>
                {passwordArray ? <table className="table-auto w-[70vw] border rounded-md overflow-hidden md:left-0">
                    <thead >
                        <tr className='bg-emerald-600 text-lg font-normal text-gray-900'>
                            <th className="text-center border border-white p-2">Name or Website Url</th>
                            <th className="text-center border  border-white p-2">Username</th>
                            <th className="text-center border border-white p-2 ">Password</th>
                        </tr>
                    </thead >
                    <tbody className='z-0 bg-emerald-300 border border-white font-medium text-gray-800'>
                        {passwordArray.map((items, index) => {
                            return (
                                <tr key={index} id='sitehover'>
                                    <td className="text-start border border-white p-2 overflow-hidden">
                                        <a href={items.url} target="_blank" className='hover:underline hover:text-blue-800'>{items.url}</a>
                                    </td>
                                    <td className="text-start border border-white p-2">
                                        <div className='flex items-center justify-between'>
                                            <span>{items.username}</span>
                                            <span className='size-5' onClick={() => { handleCopy(items.username) }}>
                                                <img className='invert-[0.5] hover:invert-0 cursor-pointer' src="src/assets/content_copy_FILL0_wght400_GRAD0_opsz24.svg" alt="copy" />
                                            </span>
                                        </div>
                                    </td>
                                    <td className="text-start border border-white p-2 ">
                                        <div className='flex items-center justify-between'>
                                            <span>{items.password}</span>
                                            <span className='size-5' onClick={() => { handleCopy(items.password) }}>
                                                <img className='invert-[0.5] hover:invert-0 cursor-pointer' src="src/assets/content_copy_FILL0_wght400_GRAD0_opsz24.svg" alt="copy" />
                                            </span>
                                            <span className="absolute -left-12 bg-teal-500 w-12 h-9 flex rounded-2xl items-center justify-evenly" id='edithover'>
                                                <img className='size-6 hover:bg-teal-700 rounded-full cursor-pointer w-4' onClick={() => { handleEdit(items.id) }} src="src/assets/edit.svg" alt="edit" />
                                                <img className='size-4 hover:bg-teal-700 h-6 cursor-pointer rounded-full' onClick={() => { handleDelete(items.id) }} src="src/assets/delete.svg" alt="delete" />
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table> : <div className='mt-20 text-5xl font-extrabold text-gray-300'>Empty</div>}

            </div>
        </>
    )
}

export default Manager
