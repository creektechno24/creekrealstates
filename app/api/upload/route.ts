import { NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"
import path from "path"
import os from "os"
import fs from "fs/promises"
import * as ftp from "basic-ftp"

export async function POST(req: Request) {

  try {

    const formData =
      await req.formData()

    const file =
      formData.get("file") as File

    if (!file) {

      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      )

    }

    const bytes =
      await file.arrayBuffer()

    const buffer =
      Buffer.from(bytes)

    const fileExtension =
      file.name.split(".").pop()

    const fileName =
      `${uuidv4()}.${fileExtension}`

    const isVideo =
      file.type.startsWith("video")

    const remoteFolder =
      isVideo
        ? "uploads/videos"
        : "uploads/images"

    const remotePath =
      `${remoteFolder}/${fileName}`

    const client =
      new ftp.Client()

    client.ftp.verbose = true

   await client.access({
  host: process.env.FTP_HOST!,
  user: process.env.FTP_USER!,
  password: process.env.FTP_PASSWORD!,
  port: Number(process.env.FTP_PORT),
  secure: true,
})

    await client.ensureDir(remoteFolder)
const tempFilePath =
  path.join(
    os.tmpdir(),
    fileName
  )

await fs.writeFile(
  tempFilePath,
  buffer
)

await client.uploadFrom(
  tempFilePath,
  remotePath
)

await fs.unlink(
  tempFilePath
)

    client.close()

    const publicUrl =
      `https://creekrealestates.com/${remotePath}`

    return NextResponse.json({
      success: true,
      url: publicUrl,
    })

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    )

  }

}