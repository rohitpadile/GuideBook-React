export function encodeTransactionId(uuid, studentName) {
    const parts = uuid.split('-');
    if (parts.length !== 5) {
        throw new Error('Invalid UUID format');
    }

    return `feed${parts[0]}-back${parts[1]}-form${parts[2]}-for${parts[3]}-session${parts[4]}-student${studentName}`;
}

export function decodeTransactionId(encodedString) {
    const parts = encodedString.split('-');
    if (parts.length !== 6) {
        throw new Error('Invalid encoded string format');
    }

    const uuid = `${parts[0].replace('feed', '')}-${parts[1].replace('back', '')}-${parts[2].replace('form', '')}-${parts[3].replace('for', '')}-${parts[4].replace('session', '')}`;
    const studentName = parts[5].replace('student', '');

    return { uuid, studentName };
}

