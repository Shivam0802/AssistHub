import React from 'react';
import Routing from './Routing';


const App = () => {
  return (
    <div className="h-screen bg-white">
      <div className="h-[100%] flex flex-col">
        <Routing />
       </div>
    </div>
  );
};

export default App;
