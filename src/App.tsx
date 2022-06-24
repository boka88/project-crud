import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './components/about'
import Create from './components/create'
import Footer from './components/footer'
import Home from './components/home'

const App = () =>  {

  return (
    <BrowserRouter>
    <div>
    <Routes>
      <Route path="/" element={< Home/>} />
      <Route path="/create" element={< Create/>} />
      <Route path="/about">
        <Route index element={<About />} />
        <Route path=":number" element={<About />} />
      </Route>
    </Routes>
    <Footer/>
    </div>
    </BrowserRouter>
  );
}

export default App;
