import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import 'prismjs/themes/prism-tomorrow.css'
import Markdown from 'react-markdown'
import prism from 'prismjs'
import Editor from 'react-simple-code-editor'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/atom-one-dark.css' // Or another theme

import axios from "axios";

import './App.css'

function App() {
const [code,setcode]=useState(`//Write your code here`)
const [review,setReview]=useState('')
const [error,setError]=useState(false)

const [loading, setLoading] = useState(false);

async function getReview() {
  setLoading(true);
  try {
    const response = await axios.post("http://localhost:3000/ai/get-review", { code });
    setReview(response.data);
    setError(false);
  } catch (error) {
    console.error("Error fetching review:", error);
    setError("Error fetching review ! ");
  } finally {
    setLoading(false);
  }
}


 useEffect(()=>{
  prism.highlightAll()
 },[])

  return (
    <>
    <main className=''>
      <div className='left'>
        <div className="code">
          <div className="code-block">
        <Editor value={code}
        onValueChange={code=>setcode(code)} 
        highlight={code=>prism.highlight(code,prism.languages.javascript, "javascript")}
        padding={10}
        >
    
          </Editor>  
          </div>      
        </div>
        <button className='review-bt' onClick={getReview}>Review</button>
      </div>

      <div className="right">

   

      {loading ? (
  <div className="loader-container">
    <div className="spinner"></div>
    <div className="loader-text">Analyzing your code...</div>
  </div>
) : (
  <div className="review-screen"><Markdown  rehypePlugins={[rehypeHighlight]}>{review}</Markdown></div>
  
)}

{error ? (
  <div className="err">{error}</div>
):""}
  </div>
    </main>
    </>
  )
}

export default App
