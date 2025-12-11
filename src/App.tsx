import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <button         
    className="px-6 py-3 bg-blue-600 text-white rounded-xl text-lg font-semibold shadow-lg hover:bg-blue-700 active:scale-95 transition"
    onClick={() => setCount((count) => count + 1)}>
      count is {count}
    </button>
  )
}

export default App
