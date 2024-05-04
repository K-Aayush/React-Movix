import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { fetchDataFromApi } from "./utils/api"
import { getApiConfiguration } from "./store/homeSlice"
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Home from './pages/home/Home';
import Explore from './pages/explore/Explore';
import Details from './pages/details/Details';
import SearchResult from './pages/searchResult/SearchResult';
import PageNotFound from './pages/error/PageNotFound';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';



function App() {

  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home)

  useEffect(() => {
    fetchApiConfiguration();
  }, [])

  const fetchApiConfiguration = () => {
    fetchDataFromApi('/configuration')
      .then((res) => {
        console.log(res)

        const url = {
          backdrop: res.images.secure_base_url + "original",
          poster: res.images.secure_base_url + "original",
          profile: res.images.secure_base_url + "original",
        }
        dispatch(getApiConfiguration(url))
      })
  }

  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:mediaType/:id' element={<Details />} />
        <Route path='/search/:query' element={<SearchResult />} />
        <Route path='/explore/:mediaType' element={<Explore />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  )
}

export default App
