import React from 'react';
import "./Assignments.css";

function Assignments({assignments}) {
  return (
    <div className='assignments'>
        <p className='assignment_details' dangerouslySetInnerHTML={{__html:assignments}}>
        </p>
    </div>
  )
}

export default Assignments