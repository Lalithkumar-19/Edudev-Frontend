import React from 'react';
import "./Notice_board.css";

function Notice_board({notice_board}) {
  return (
    <div className='notice_board'>
        <p className='notice_info' dangerouslySetInnerHTML={{__html:notice_board}}>
        </p>
    </div>
  )
}

export default Notice_board