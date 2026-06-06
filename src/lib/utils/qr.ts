import QRCode from "qrcode";

export async function generateQrImage(qrValue: string) {
  return QRCode.toDataURL(qrValue);
}
