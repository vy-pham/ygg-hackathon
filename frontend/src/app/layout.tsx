/** @format */
"use client"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import { Geist, Geist_Mono } from "next/font/google"

import "@mui/icons-material"
import { Grid2 } from "@mui/material"
import Link from "next/link"
import { ToastContainer } from "react-toastify"
import "./globals.css"
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})
const menu = [
  {
    name: "Partner Management",
    url: "/partner-management",
  },
]
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <ToastContainer position="bottom-center" autoClose={1000} />

          <Grid2 container>
            <Grid2 sx={{ "&::-webkit-scrollbar": { display: "none" } }} className="border-r-2 border-black" size={4} height={"100vh"} overflow={"scroll"}>
              <aside className="border-r-2 border-white">
                <ul>
                  {menu.map((o) => (
                    <li key={o.url}>
                      <Link className="p-4 block font-bold" href={o.url}>
                        {o.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </aside>
            </Grid2>
            <Grid2 sx={{ "&::-webkit-scrollbar": { display: "none" } }} size={8} height={"100vh"} overflow={"scroll"}>
              <div className="px-4">{children}</div>
            </Grid2>
          </Grid2>
        </body>
      </html>
    </>
  )
}
