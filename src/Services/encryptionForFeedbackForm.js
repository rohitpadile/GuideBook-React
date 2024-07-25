// src/utils/encryptionUtils.js
import CryptoJS from 'crypto-js';

export function decryptTransactionId(encryptedTransactionId) {
    try {
        // Replace the following with the actual key used for encryption
        const key = CryptoJS.enc.Utf8.parse('1234567890123456'); // Example key (must be the same as used in encryption)
        
        // Decode the encrypted string from Base64
        const encryptedData = CryptoJS.enc.Base64.parse(encryptedTransactionId).toString(CryptoJS.enc.Hex);
        
        // Extract the IV and encrypted text
        const iv = CryptoJS.enc.Hex.parse(encryptedData.substr(0, 24));
        const encryptedText = encryptedData.substr(24);

        // Decrypt the data
        const decrypted = CryptoJS.AES.decrypt(
            { ciphertext: CryptoJS.enc.Hex.parse(encryptedText) },
            key,
            { iv: iv, mode: CryptoJS.mode.GCM, padding: CryptoJS.pad.Pkcs7 }
        );

        // Return the decrypted text
        return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (error) {
        console.error('Error decrypting transaction ID:', error);
        throw error;
    }
}
