import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Column from './components/Column'
import File from './components/File'
import { useSelector } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import ExtractedTable from './components/ExtractedTable/ExtractedTable'
function App() {
  const [count, setCount] = useState(0)
  const dataArray = useSelector(state => state.data.dataArray)

  return (
    <>

      <File />
      {dataArray.length > 0 && <ExtractedTable />}


    </>
  )
}

export default App
