import React from 'react'
import '../Stylesheets/header.css'
import headerLogo from '../Images/templogo.png'

export default function Header() {
  return (
    <header>
        <img src={headerLogo} className='header--logo' />
        <h1>My fitness Cal</h1>
    </header>
  )
}
