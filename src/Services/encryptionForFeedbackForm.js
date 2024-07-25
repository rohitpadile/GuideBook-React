export function encodeTransactionId(uuid) {
    const parts = uuid.split('-');
    if (parts.length !== 5) {
        throw new Error('Invalid UUID format');
    }

    return `feed${parts[0]}-back${parts[1]}-form${parts[2]}-for${parts[3]}-session${parts[4]}`;
}

export function decodeTransactionId(encodedString) {
    const parts = encodedString.split('-');
    if (parts.length !== 5) {
        throw new Error('Invalid encoded string format');
    }

    return `${parts[0].replace('feed', '')}-${parts[1].replace('back', '')}-${parts[2].replace('form', '')}-${parts[3].replace('for', '')}-${parts[4].replace('session', '')}`;
}
