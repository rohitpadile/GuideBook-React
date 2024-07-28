export const decrypt = (encryptedData) => {
  const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;

  let formId = '';
  let email = '';
  let isUuidComplete = false;

  for (let i = 0; i < encryptedData.length; i += 6) {
    const char = encryptedData[i];

    if (!isUuidComplete) {
      formId += char;

      if (uuidPattern.test(formId)) {
        isUuidComplete = true;
      }
    } else {
      email += char;
    }
  }

  return { zoomSessionFormId: formId, studentWorkEmail: email };
};
