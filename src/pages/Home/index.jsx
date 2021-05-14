import { Link } from 'react-router-dom'
import LastThree from "../LastThree"
import React  from 'react';

const Home = () => (
  <div className="w-full h-screen flex justify-center items-center">
    <div className="flex flex-col items-center">
      <div>
      Welcome to e-shop React
      <div>
        <LastThree />
      </div>
      </div>
    </div>
  </div>
  )

export default Home;
