import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import prism from 'prismjs'
import Editor from 'react-simple-code-editor'
import axios from 'axios'
import Markdown from "react-markdown"
import rehypeHighlight from 'rehype-highlight'
import "highlight.js/styles/github-dark.css";
import './App.css'

function App() {
  
  const [code, setcode] = useState(` function add(a, b) {
    return a + b;
  }`)
 
const [review, setReview] = useState(``)

  useEffect(() => {
    prism.highlightAll();
  }, [])

  async function reviewCode() {
   try{
   const response = await axios.post('http://localhost:3000/ai/get-review', {code})
      setReview(response.data)
   }
   catch(error){
    console.error("Error fetching review:", error);
    setReview("Error getting review");
   }

  }
    
    return (
    <>
    <main>
      <div className="left">
        <div className="code">
          <Editor
            value={code}
            onValueChange={code => setcode(code)}
            highlight={code => prism.highlight(code, prism.languages.js)}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
              border: '1px solid #dddddd',
              borderRadius: '5px',
              height: '100%',
              width: '100%',
              
            }}
          />
        </div>
        <div 
        onClick={reviewCode} className="review">Review</div>
      </div>
      <div className="right">
       <Markdown
       
       rehypePlugins={[rehypeHighlight]}
       
       >{review}</Markdown>
      </div>
    </main>
    </>
  )
}

export default App;
