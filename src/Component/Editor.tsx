import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const QuillEditor: React.FC = () => {
  const [content, setContent] = useState<string>('');

  return (
    <div>
      <ReactQuill 
        value={content} 
        onChange={setContent} 
      />
      {/* <button onClick={() => console.log(content)}>Log Content</button> */}
    </div>
  );
};

export default QuillEditor;