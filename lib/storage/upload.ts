export async function uploadFile(file: File) {

  const isVideo =
    file.type.startsWith("video")

  // FILE SIZE LIMITS
  const MAX_IMAGE_SIZE =
    10 * 1024 * 1024 // 10MB

  const MAX_VIDEO_SIZE =
    50 * 1024 * 1024 // 50MB

  if (
    !isVideo &&
    file.size > MAX_IMAGE_SIZE
  ) {

    throw new Error(
      "Image size must be less than 10MB"
    )

  }

  if (
    isVideo &&
    file.size > MAX_VIDEO_SIZE
  ) {

    throw new Error(
      "Video size must be less than 50MB"
    )

  }

  const formData = new FormData()

  formData.append(
    "file",
    file
  )

  formData.append(
    "upload_preset",
    process.env
      .NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
  )

  formData.append(
    "folder",
    isVideo
      ? "realestate/videos"
      : "realestate/images"
  )

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${
      process.env
      .NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    }/auto/upload`,
    {
      method: "POST",
      body: formData,
    }
  )

  const data =
    await response.json()

  if (!response.ok) {

    throw new Error(
      data.error?.message ||
      "Upload failed"
    )

  }

  return {
    url: data.secure_url,
    publicId: data.public_id,
    resourceType:
      data.resource_type,
  }

}