import { NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
})

export async function POST(req: Request) {

  try {

    const body = await req.json()

    console.log("BODY:", body)

    const publicIds = body.publicIds
    const resourceType = body.resourceType || "image"

    console.log("PUBLIC IDS:", publicIds)
    console.log("RESOURCE TYPE:", resourceType)

    if (!publicIds || publicIds.length === 0) {

      return NextResponse.json({
        success: false,
        message: "No public IDs found",
      })

    }

    const result = await cloudinary.api.delete_resources(
      publicIds,
      {
        resource_type: resourceType,
        type: "upload",
      }
    )

    console.log("DELETE RESULT:", result)

    return NextResponse.json({
      success: true,
      result,
    })

  } catch (error) {

    console.log("DELETE ERROR:", error)

    return NextResponse.json(
      {
        success: false,
        error,
      },
      {
        status: 500,
      }
    )

  }

}