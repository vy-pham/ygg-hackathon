/** @format */
"use client"
import callAPI from "@/callAPI"
import { Box, Button, Grid2, TextField } from "@mui/material"
import { useRouter } from "next/navigation"
import { FormEvent, useRef } from "react"

export default function CreatePartner() {
  const formRef = useRef<HTMLFormElement>(null)
  const router = useRouter()

  const handleCreatePartner = async (event: FormEvent) => {
    event.preventDefault()
    if (!formRef.current) return
    const formData = new FormData(formRef.current)
    const entries = Array.from(formData.entries())
    const data: { [k: string]: any } = {}
    for (const [key, value] of entries) {
      data[key] = value
    }
    const res = await callAPI.post("/partner", data, { toastSuccess: true, toastError: true })
    if (res.data) {
      router.push("/partner-management")
    }
  }
  return (
    <>
      <h1 className="text-2xl text-center">Create Partner</h1>
      <Box ref={formRef} onSubmit={handleCreatePartner} component="form" noValidate autoComplete="off">
        <Grid2 container spacing={2}>
          <Grid2 size={6}>
            <TextField name="name" className="w-full" color="primary" required id="outlined-required" label="Partner Name" />
          </Grid2>
          <Grid2 size={6}>
            <TextField name="domain" className="w-full" color="primary" required id="outlined-required" label="Domain" />
          </Grid2>
          <Grid2 size={6}>
            <TextField name="username" className="w-full" color="primary" required id="outlined-required" label="Username" />
          </Grid2>
          <Grid2 size={6}>
            <TextField name="password" className="w-full" color="primary" required id="outlined-required" label="Password" />
          </Grid2>
          <Grid2 size={12}>
            <Button className="w-full" variant="contained" type="submit">
              Create
            </Button>
          </Grid2>
        </Grid2>
      </Box>
    </>
  )
}
