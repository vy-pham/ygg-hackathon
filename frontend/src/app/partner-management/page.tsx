/** @format */
"use client"
import callAPI from "@/callAPI"
import { Button, Paper } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"

const columns: GridColDef[] = [
  { field: "_id", headerName: "ID", width: 100 },
  { field: "name", headerName: "Partner Name", flex: 1 },
  { field: "domain", headerName: "Partner Domain", flex: 1 },
  { field: "username", headerName: "Partner Username", flex: 1 },
  {
    field: "action",
    headerName: "Action",
    flex: 1,
    renderCell: (params) => (
      <>
        <Button variant="outlined" size="small">
          <Link href={`/partner-management/edit/${params.row._id}`}>Edit</Link>
        </Button>
        <Button variant="outlined" color="warning" size="small">
          Delete
        </Button>
      </>
    ),
  },
]

const paginationModel = { pageSize: 10 }

export default function PartnerManagement() {
  const [partners, setPartners] = useState([])
  const fetchPartner = useCallback(async () => {
    const res = await callAPI.get("/partner")
    setPartners(res.data)
  }, [])

  useEffect(() => {
    fetchPartner()
  }, [])
  return (
    <>
      <h1 className="text-2xl text-center">Partner Management</h1>
      <Button variant="contained">
        <Link href="/partner-management/create">Create partner</Link>
      </Button>
      <Paper sx={{ width: "100%" }}>
        <DataGrid rows={partners} getRowId={(row) => row._id} columns={columns} initialState={{ pagination: { paginationModel } }} />
      </Paper>
    </>
  )
}
