import { NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
})

export async function POST(req: Request) {
  try {

    const { publicIds } =
      await req.json()

    if (
      !publicIds ||
      publicIds.length === 0
    ) {
      return NextResponse.json({
        success: true
      })
    }

    await cloudinary.api.delete_resources(
      publicIds
    )

    return NextResponse.json({
      success: true
    })

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      {
        success:false
      },
      {
        status:500
      }
    )

  }
}