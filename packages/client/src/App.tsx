/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { Button } from "./components/ui/button";

function App() {
  const [message,setMessage] = useState('')
  
  useEffect(() => { 
    fetch('/api/hello')
      .then(res => res.json())
      .then(data => {
        setMessage(data.message)
      })
  }, []);

  return (
    <div className="App">
      <h1 className="font-bold p-4">{message}</h1>
      <div className="flex min-h-svh flex-col items-center justify-center">
      <Button>Click me</Button>
      </div>
    </div>
  )
}

export default App
