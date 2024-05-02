import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { fetchDataFromApi } from "./utils/api"
import { getApiConfiguration } from "./store/homeSlice"

function App() {

  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home)

  useEffect(() => {
    apiTest();
  }, [])

  const apiTest = () => {
    fetchDataFromApi('/movie/popular')
      .then((res) => {
        console.log(res)
        dispatch(getApiConfiguration(res))
      })
  }

  return (
    <div className='App'>App
      {url?.total_pages}
    </div>
  )
}

export default App
