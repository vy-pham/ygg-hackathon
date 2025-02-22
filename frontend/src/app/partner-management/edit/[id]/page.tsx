/** @format */
"use client"
import callAPI from "@/callAPI"
import React, { useState } from "react"

export default function EditPartner({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = React.use(params)

  const id = unwrappedParams.id
  const [partner, setPartner] = useState(null)

  const getPartner = async () => {
    callAPI.get("")
  }
  return (
    <>
      <h1 className="text-2xl text-center">Edit Partner {id}</h1>
    </>
  )
}
