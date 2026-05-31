export const cloudinaryCloudName =
  import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "def2tagoe";

export const cloudinaryUploadPreset =
  import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "orchard";

const cloudinaryBaseUrl = `https://res.cloudinary.com/${cloudinaryCloudName}`;

export function cloudinaryImage(publicId, transformations = "f_auto,q_auto") {
  const transformPath = transformations ? `${transformations}/` : "";
  return `${cloudinaryBaseUrl}/image/upload/${transformPath}${publicId}`;
}

export function cloudinaryVideo(publicId, transformations = "q_auto") {
  const transformPath = transformations ? `${transformations}/` : "";
  return `${cloudinaryBaseUrl}/video/upload/${transformPath}${publicId}`;
}
