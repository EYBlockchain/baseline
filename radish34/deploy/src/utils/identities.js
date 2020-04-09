const axios = require('axios');

let whisperIdentities;

const {
  MESSENGER_SENDER_URI,
  MESSENGER_RECIPIENT_URI,
} = process.env;

const getWhisperIdentity = url => axios.get(url).then(response => response.data[0].publicKey);
const getWhisperIdentities = async () => {
  if (whisperIdentities) {
    return whisperIdentities;
  }

  try {
    const sender = await getWhisperIdentity(`${MESSENGER_SENDER_URI}/api/v1/identities`);
    const recipient = await getWhisperIdentity(`${MESSENGER_RECIPIENT_URI}/api/v1/identities`);
    console.log('✅  Retrieved all Whisper Identity for each user');
    whisperIdentities = {
      sender,
      recipient,
    };
    return whisperIdentities;
  } catch (error) {
    console.log('Could not retrieve Whisper ID. Check health of MESSENGER services:', error);
    return process.exit(1);
  }
};

module.exports = {
  getWhisperIdentities,
};
