import twilio from 'twilio';

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const generateSMS = async (req,res) => {
  console.log(`Request: ${req.body}`)
  // const inputs = req.body.inputs;
  // console.log(inputs);
  const smsBody = req.body.smsBody;
  // const smsTo = inputs.smsTo;
  const smsTo = '+17028868834';
// Call Twilio API with smsBody and smsTo
  client.messages
  .create({
      body: smsBody,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: smsTo
    })
  .then(message => console.log(message.sid))
  .done();
  res.status(200).json({ message: 'SMS sent' });
};

export default generateSMS;

