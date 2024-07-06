import React, { useState, useRef, useEffect } from 'react';
import { GrCloudUpload } from "react-icons/gr";
import { db, storage } from "../firebase"; // Adjust this import based on your firebase configuration
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const UpdateProfileForm = ({ onClose, user }) => { // Assume user object is passed as prop
    const fileInputRef = useRef(null);
    const [profileImage, setProfileImage] = useState("https://via.placeholder.com/150");
    const [file, setFile] = useState(null);
    const [data, setData] = useState({
        name: '',
        bio: '',
        profileImage: ''
    });

    const handleFileUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            setProfileImage(fileURL);
            setFile(file);
            console.log(`File selected: ${file.name}`);
        }
    };

    useEffect(() => {
        const uploadFile = () => {
            if (!file) return;

            const name = `${new Date().getTime()}-${file.name}`;
            const fileRef = ref(storage, name);
            const uploadTask = uploadBytesResumable(fileRef, file);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setData((prevData) => ({
                            ...prevData,
                            profileImage: downloadURL
                        }));
                    });
                }
            );
        };

        uploadFile();
    }, [file]);

    const updateUserProfile = async (event) => {
        event.preventDefault();
        let User = localStorage.getItem('user');
        const userId = JSON.parse(User).uid;
        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, {
            name: data.name,
            bio: data.bio,
            profileImage: data.profileImage
        });
        onClose();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <div className="w-full p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold mb-4 text-[#DA7297] font-comfortaa">Update Your Profile</h2>
            <form onSubmit={updateUserProfile}>
                <div className='mb-4'>
                    <label className="text-[1.5rem] text-[#1A2130] font-comfortaa" htmlFor="file">Upload Profile Picture</label>
                    <div className='flex flex-row items-center gap-2 justify-around'>
                        <div>
                            <img src={profileImage} alt="profile" className="w-40 h-40 rounded-full mt-2 object-cover" />
                        </div>
                        <div className="flex flex-col border border-gray-200 w-42 h-[10rem] p-4 items-center rounded-lg cursor-pointer ml-4" onClick={handleFileUploadClick}>
                            <div className="mt-4">
                                <GrCloudUpload className="text-5xl text-[#1A2130]" />
                            </div>
                            <div className="text-[1.12rem] text-[#1A2130] mt-2">
                                <span>Click to upload image</span>
                            </div>
                        </div>
                        <input type="file" id="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
                    </div>
                </div>
                <div className='mb-4'>
                    <label htmlFor="name" className="text-[1.5rem] text-[#1A2130] font-comfortaa">Name</label>
                    <input type="text" id="name" name="name" value={data.name} onChange={handleChange} className="w-full p-2 mb-4 border rounded-lg focus:ring focus:ring-blue-200 text-gray-900" placeholder='Write your Name...' />
                </div>
                <div className='mb-4'>
                    <label htmlFor="bio" className="text-[1.5rem] text-[#1A2130] font-comfortaa">Bio</label>
                    <textarea id="bio" name="bio" value={data.bio} onChange={handleChange} className="w-full p-2 mb-4 border rounded-lg focus:ring focus:ring-blue-200 text-gray-900" placeholder='Describe yourself.....' />
                </div>
                <div className='flex flex-row gap-2'>
                    <button type="button" className="w-full px-4 py-2 font-semibold text-white bg-red-400 rounded-md hover:bg-red-700" onClick={onClose}>Cancel</button>
                    <button
                        type="submit"
                        className='w-full px-4 py-2 font-semibold text-white rounded-md bg-blue-400 hover:bg-blue-700'
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UpdateProfileForm;
