import React from 'react'

export default function Loader() {
  return (
    <>
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
    </div>
    </>
  )
}
