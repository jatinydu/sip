import cloudinary from "@/lib/configs/cloudinary";

export async function uploadQrCode(qrImageBase64: string) {
  return cloudinary.uploader.upload(qrImageBase64, {
    folder: "sip/qr-codes",
  });
}
