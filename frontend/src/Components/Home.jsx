import React from 'react'
import { Outlet } from 'react-router-dom'

export function Home() {
  return (
    <div>
        <h1>Home</h1>
        <Outlet/>
    </div>
  )
}

