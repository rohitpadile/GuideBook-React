import CryptoJS from 'crypto-js';

const secretKey = 'feedbackFormPass';

export const decryptTransactionId = (encryptedId) => {
    const bytes = CryptoJS.AES.decrypt(encryptedId, secretKey);
    const decryptedId = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedId;
};
