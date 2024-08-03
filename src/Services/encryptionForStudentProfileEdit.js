import CryptoJS from 'crypto-js';

const ALGORITHM = 'AES';
const KEY = 'MySuperSecretKey'; // Ensure this matches the backend key

export function decrypt(encryptedValue) {
  const bytes = CryptoJS.AES.decrypt(encryptedValue, CryptoJS.enc.Utf8.parse(KEY), {
    mode: CryptoJS.mode.ECB, // No IV is used, so use ECB mode
    padding: CryptoJS.pad.Pkcs7,
  });
  return bytes.toString(CryptoJS.enc.Utf8);
}
