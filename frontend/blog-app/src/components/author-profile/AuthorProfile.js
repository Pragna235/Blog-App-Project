import React from 'react'
import {Outlet,NavLink} from 'react-router-dom'

function AuthorProfile() {
  return (
    <div>
      <ul className="nav justify-space-around p-3 fs-2 mt-5">
        
            
            <li className="nav-item">
              <NavLink className="nav-link text-black" to="add-article">
                Add Article
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-black" to="articles-of-author">
                Articles of Author
              </NavLink>
            </li>
           
        
        
      </ul>
      <Outlet />
    </div>
  )
}

export default AuthorProfile