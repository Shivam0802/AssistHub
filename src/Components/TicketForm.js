import React, { useEffect, useState } from 'react';
import { auth, db, storage } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { serverTimestamp } from "firebase/firestore";

const TicketForm = ({ onClose }) => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState({
    category: '',
    priority: '',
    subject: '',
    attachment: '',
    issue: ''
  });
  const [percentage, setPercentage] = useState(null);

  useEffect(() => {
    const uploadFile = () => {
      if (!file) return;
      
      const name = `${new Date().getTime()}-${file.name}`;
      const fileRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(fileRef, file);

      uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setPercentage(progress);
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
              console.log('Upload is done');
          }
        }, 
        (error) => {
          console.log(error);
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prevData) => ({
              ...prevData,
              attachment: downloadURL
            }));
            setPercentage(100); // Upload completed
          });
        }
      );
    };

    uploadFile();
  }, [file]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFile(files[0]);
    } else {
      setData({
        ...data,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'tickets'), {
        userId: auth.currentUser.uid,
        category: data.category,
        priority: data.priority,
        subject: data.subject,
        status: 'Pending',
        attachment: data.attachment,
        issue: data.issue,
        timestamp: serverTimestamp()
      });
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const isSubmitDisabled = !data.category || !data.priority || !data.subject || !data.attachment || !data.issue || (percentage !== null && percentage < 100);

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-4 text-[#006769] font-comfortaa">Raise a Ticket</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="category" className="text-[1.35rem] font-semibold mb-2 ml-2 text-gray-900 font-comfortaa">Category</label>
          <select
            id='category'
            name='category'
            onChange={handleChange}
            className="w-full p-[0.3rem] text-[#153448] mb-2 border rounded-lg focus:ring focus:ring-blue-200">
            <option value="Select" className='text-xl font-semibold mb-2 text-gray-900 font-comfortaa'>Select</option>
            <option value="Technical" className='text-xl font-semibold mb-2 text-gray-900 font-comfortaa'>Technical</option>
            <option value="General" className='text-xl font-semibold mb-2 text-gray-900 font-comfortaa'>General</option>
            <option value="Billing" className='text-xl font-semibold mb-2 text-gray-900 font-comfortaa'>Billing</option>
          </select>
        </div>
        <div>
          <label htmlFor="priority" className="text-[1.35rem] font-semibold mb-2 ml-2 text-gray-900 font-comfortaa">Priority</label>
          <select
            name='priority'
            id='priority'
            onChange={handleChange}
            className="w-full p-2 mb-2 text-[#153448] border rounded-lg focus:ring focus:ring-blue-200">
            <option value="Select" className='text-xl font-semibold mb-2 text-gray-900 font-comfortaa'>Select</option>
            <option value="Low" className='text-xl font-semibold mb-2 text-gray-900 font-comfortaa'>Low</option>
            <option value="Medium" className='text-xl font-semibold mb-2 text-gray-900 font-comfortaa'>Medium</option>
            <option value="High" className='text-xl font-semibold mb-2 text-gray-900 font-comfortaa'>High</option>
          </select>
        </div>
        <div>
          <label htmlFor="subject" className="text-[1.35rem] font-semibold mb-2 ml-2 text-gray-900 font-comfortaa">Title</label>
          <input
            type='text'
            name='subject'
            id='subject'
            onChange={handleChange}
            required
            placeholder="Subject"
            className="w-full p-2 mb-2 text-[#153448] border rounded-lg focus:ring focus:ring-blue-200" />
        </div>
        <div>
          <label htmlFor='attachment' className="text-[1.35rem] font-semibold mb-2 ml-2 text-gray-900 font-comfortaa">Upload Images</label>
          <input
            type='file'
            id='attachment'
            onChange={handleChange}
            required name='attachment'
            className="flex h-10 w-full mb-2 rounded-lg border border-input bg-white text-sm text-gray-400 file:border-0 file:m-[0.25rem] file:px-3 file:pt-[0.25rem] file:pb-[0.4rem] file:rounded-lg file:bg-[#F7DCB9] file:text-gray-900 file:text-[1rem] file:font-medium" />
        </div>
        <div>
          <label htmlFor="issue" className="text-[1.35rem] font-semibold mb-2 ml-2 text-gray-900 font-comfortaa">Issue Description</label>
          <textarea
            name='issue'
            id='issue'
            onChange={handleChange}
            required
            placeholder="Issue Description"
            className="w-full p-2 mb-2 text-[#153448] border rounded-lg focus:ring focus:ring-blue-200"></textarea>
        </div>
        <div className='flex flex-row gap-2'>
          <button type="button" className="w-full px-4 py-2 font-semibold text-white bg-red-400 rounded-md hover:bg-red-700" onClick={onClose}>Cancel</button>
          <button 
            disabled={isSubmitDisabled}
            type="submit" 
            className={`w-full px-4 py-2 font-semibold text-white rounded-md ${isSubmitDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-400 hover:bg-blue-700'}`}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default TicketForm;
