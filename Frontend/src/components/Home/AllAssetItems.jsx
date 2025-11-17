import React from 'react'
import { useParams } from 'react-router-dom'

function AllAssetItems() {
    const {id}= useParams()
  return (
    <div>{id}</div>
  )
}

export default AllAssetItems