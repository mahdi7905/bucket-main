import React from 'react'
import { NavLink } from 'react-router-dom';
import "./tab.css"

import AssignmentIcon from '@mui/icons-material/Assignment';
import AddTaskIcon from '@mui/icons-material/AddTask';
import TaskIcon from '@mui/icons-material/Task';
import PendingActionsIcon from '@mui/icons-material/PendingActions';

const Tab = () => {
  return (
     <nav className="tablinks">
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
        </nav>
  )
}

export default Tab