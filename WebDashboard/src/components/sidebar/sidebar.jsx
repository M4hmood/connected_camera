import './sidebar.css';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Navbar() {
  const sideBarData = [
    {
      title: "Home",
      icon: <HomeIcon />,
      link: "/home"
    },
    {
      title: "Dashboard",
      icon: <DashboardIcon />,
      link: "/dashboard"
    },
    {
      title: "Notifications",
      icon: <NotificationsIcon />,
      link: "/notifications"
    },
    {
      title: "Profile",
      icon: <PersonIcon />,
      link: "/Profile"
    },
    {
      title: "Logout",
      icon: <LogoutIcon />,
      link: "/Signin"
    }
  ];

  return (
    <div className='sidebar_container'>
      <ul className='sidebar_list'>
        {sideBarData.map((val, key) => {
          return (
          <li 
            key={key} 
            className='row' 
            id={window.location.pathname === val.link ? "active": ""} 
            onClick={ () => {
              window.location.pathname = val.link
            }}
          >
            {" "}
            <div id="icon">{val.icon}</div>{" "}
            <div id="title">{val.title}</div>
          </li>);
        })}
      </ul>
    </div>
  )
}
