import {Link, useLocation} from "react-router-dom";

export default function AdminNav() {
  const {pathname} = useLocation();
  //uses the path to determine whether we are currently on the profile, bookings, or places page
  let subpage = pathname.split('/')?.[2];

  //types is passed with the function, as either 'profile', 'bookings', or 'places'
  function linkClasses (type=null) {
    console.log("I don't understand, is this thing even running?");
    let classes = 'inline-flex gap-1 py-2 px-6 rounded-full';
    //the header for the subpage we are on is pink
    if (type === subpage) {
      classes += ' bg-pink-600 text-white';
    //the header for the two other pages are gray
    } else {
      classes += ' bg-gray-200';
    }
    return classes;
  }
  return (
    <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
      <Link className={linkClasses('users')} to={'/admin/users'}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
        My users
      </Link>
      <Link className={linkClasses('conferences')} to={'/admin/conferences'}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
        My signups
      </Link>
    </nav>
  );
}