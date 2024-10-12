import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const QuillEditor: React.FC<QuillEditorProps> = ({ value, onChange }) => {
  const [content, setContent] = useState<string>("");

  return (
    <div>
      <ReactQuill value={value} onChange={onChange} />
      {/* <button onClick={() => console.log(content)}>Log Content</button> */}
    </div>
  );
};

export default QuillEditor;
