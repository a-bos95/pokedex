import React from 'react'
import Header from './components/Header'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'

export default function RootLayout() {
  return (
    <>
      <Header>
        <Navbar />
      </Header>
        <Outlet />
      <Footer />
    </>
  )
}
