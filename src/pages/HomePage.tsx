import {Link, NavLink} from 'react-router-dom';

const HomePage = () => {
  const nav = ( { isActive, isPending}: { isActive: boolean, isPending: boolean} ) => isPending ? "text-gray-500" : isActive ? "text-blue-500" : "";
  return (
    <div className='space-x-4 text-center no-underline'>
      <NavLink to={'/map'} className={nav}>지도 페이지</NavLink>
      <NavLink to={'/query'} className={nav}>React-Query 페이지</NavLink>
      <NavLink to={'/recoil'} className={nav}>Recoil 페이지</NavLink>
    </div>
  )
}

export default HomePage;