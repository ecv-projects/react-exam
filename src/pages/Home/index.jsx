import { Link } from 'react-router-dom'

const Home = () => (
  <div className="w-full h-screen flex justify-center items-center">
    <div className="flex flex-col items-center">
      <Link className="block mt-2" to="/register">Register</Link>
      <Link className="block mt-2" to="/login">Login</Link>
    </div>
  </div>
)


export default Home;
