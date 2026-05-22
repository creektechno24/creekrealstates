export async function uploadFile(file: File) {

  const formData = new FormData()

  formData.append("file", file)

  formData.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
  )

  // CHECK FILE TYPE
  const isVideo =
    file.type.startsWith("video")

  // STORE IN SEPARATE FOLDERS
  formData.append(
    "folder",
    isVideo
      ? "realestate/videos"
      : "realestate/images"
  )

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`,
    {
      method: "POST",
      body: formData,
    }
  )

  const data = await response.json()

  if (!response.ok) {

    throw new Error(
      data.error?.message ||
      "Upload failed"
    )

  }

  return {
    url: data.secure_url,
    publicId: data.public_id,
    resourceType: data.resource_type,
  }
}