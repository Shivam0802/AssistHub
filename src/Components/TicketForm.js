import React from 'react';

const TicketForm = () => {
  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Raise a Ticket</h2>
      <form >
        <textarea  required placeholder="Issue Description" className="w-full p-2 mb-2 border rounded-md focus:ring focus:ring-blue-200"></textarea>
        <select  className="w-full p-2 mb-2 border rounded-md focus:ring focus:ring-blue-200">
          <option value="General">General</option>
          <option value="Technical">Technical</option>
          <option value="Billing">Billing</option>
        </select>
        <select  className="w-full p-2 mb-2 border rounded-md focus:ring focus:ring-blue-200">
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button type="submit" className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-700">Submit</button>
      </form>
    </div>
  );
};

export default TicketForm;
