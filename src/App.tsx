import React from 'react';
import 'ol/ol.css';
import './Sidebar.css';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import Basemap from './components/Map';

function App() {
  return (
    <>
      <div className='App'>
        <Basemap />
      </div>
    </>
  );
}

export default App;
