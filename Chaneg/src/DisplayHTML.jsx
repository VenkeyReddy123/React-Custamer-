import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

function DisplayHTML({ htmlContent }) {
  return (
    <div>
     <ReactQuill
  theme="snow"
  value={htmlContent}
  readOnly={true}
  modules={{ toolbar: false }}
  style={{ border: '' }} // Apply inline style to remove the border
/>
    </div>
  );
}

export default DisplayHTML;
