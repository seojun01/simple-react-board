import { useEffect, useState } from "react";
import "./App.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Parser from "html-react-parser";
import Axios from 'axios';

function App() {
  const [movieContent, setMovieContent] = useState({
    title: "",
    content: "",
  });

  const [viewContent, setViewContent] = useState([]);

  useEffect(() => {
    Axios.get('/api/get').then((response) => {
      setViewContent(response.data);
    })
  }, [])

  const submitReview = () => {
    Axios.post('/api/insert', {
      title: movieContent.title,
      content: movieContent.title
    }).then(() => { window.location.replace("/");})
  };

  const getValue = (e) => {
    const { name, value } = e.target;
    setMovieContent({
      ...movieContent,
      [name]: value,
    });
  };
  return (
    <div className="App">
      <h1>Board</h1>
      <div className="movie-container">
        {viewContent?.map((element) => (
          <div>
            <h2>{element.title}</h2>
            <div>{Parser(element.content)}</div>
          </div>
        ))}
      </div>
      <div className="form-wrapper">
        <input
          className="title-input"
          type="text"
          placeholder="제목"
          onChange={getValue}
          name="title"
        />
        <CKEditor
          editor={ClassicEditor}
          data="<p>Hello from CKEditor 5</p>"
          onReady={(editor) => {
            //You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            setMovieContent({
              ...movieContent,
              content: data,
            });
          }}
          onBlur={(event, editor) => {
            console.log("Blur", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus", editor);
          }}
        ></CKEditor>
      </div>
      <button
        className="submit-button"
        onClick={submitReview}
      >
        입력
      </button>
    </div>
  );
}

export default App;
