import { GetStaticProps } from 'next'
import { useEffect, useState } from 'react'

export function Async() {

  const [visibleButton, setVisibleButton] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setVisibleButton(true)
    },1000)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setVisibleButton(false)
    }, 8000)
  }, [])


  return (
    <div>
      <div>How to testing things async...</div>
      {visibleButton && <button> 3s to show...</button>}
    </div>
  )
}
