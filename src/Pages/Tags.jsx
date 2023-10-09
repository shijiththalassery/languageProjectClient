import React, { useState } from 'react';

function Tags() {

    return (
        <div>
            <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="flex justify-center">
            <div className="border border-black p-4">
              <div className="font-semibold">Name</div>
              <div className="text-gray-600">Price: </div>
              <div className="text-gray-600">Language:</div>
            </div>
          </div>


          <div className="bg-white rounded-lg shadow-lg p-4">
          <div className="flex justify-center">
          <div className="border border-black p-4">
            <div className="font-semibold">You dont have any course</div>
          </div>
        </div>
        </div>

        
        </div>
        </div>
    );
}

export default Tags;
