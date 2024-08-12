import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom';
import "./navbar.css"

import AssignmentIcon from '@mui/icons-material/Assignment';
import AddTaskIcon from '@mui/icons-material/AddTask';
import TaskIcon from '@mui/icons-material/Task';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import LogoutIcon from '@mui/icons-material/Logout';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useTheme } from '../../context/darkModeContext';
import { AuthContext } from '../../context/authContext';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
    const {theme,toggleTheme} = useTheme()
    const {user} = useContext(AuthContext)
    const {Logout} = useAuth()
  return (
    <header className='navbar'>
        <h1 className="logo">Bucket</h1>
        <nav className="navlinks">
           {
                user && (
                     <ul>
                <li>
                    <NavLink to="/">
                        <AssignmentIcon style={{width:"30px", height:"30px"}}/>
                        <p>Bucket</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/accomplished">
                        <TaskIcon style={{width:"30px", height:"30px"}}/>
                        <p>Accomplished</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/pending">
                        <PendingActionsIcon style={{width:"30px", height:"30px"}}/>
                        <p>Pending</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/new">
                        <AddTaskIcon style={{width:"30px", height:"30px"}}/>
                        <p>New Task</p>
                    </NavLink>
                </li>
            </ul>
                )
           }
        </nav>
        <div className='nav-actions'>
            <button className='darkbtn' onClick={toggleTheme}>
                {
                    theme === "light" ? <DarkModeIcon style={{width:"30px", height:"30px"}}/>:
                    <LightModeIcon style={{width:"30px", height:"30px"}}/>
                }
            </button>
            {
                user && <button className='darkbtn' onClick={Logout}><LogoutIcon style={{width:"25px", height:"25px"}}/></button>

            }
        </div>
    </header>
  )
}

export default Navbar