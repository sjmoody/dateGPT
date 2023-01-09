
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = require('twilio')(accountSid, authToken);

const client = require('twilio')('AC78fc44cf049d150fdb97ad42b5473d05', '74fb92f08b0409d1d5f76a33fa234332');

client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+13054192786',
     to: '+17028868834'
   })
  .then(message => console.log(message.sid));

