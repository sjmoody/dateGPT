import twilio from 'twilio';

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const generateSMS = async (req,res) => {
  console.log(`Request: ${req.body}`)
  // const inputs = req.body.inputs;
  // console.log(inputs);
  const smsBody = req.body.smsBody;
  const smsTo = req.body.smsTo;
  // const smsTo = '+17028868834';
  const smsBodyShort = smsBody.substring(0, 1500)
  console.log(`SMS Body: ${smsBodyShort}`)

  try {
      // Call Twilio API with smsBody and smsTo
    client.messages
    .create({
      body: smsBodyShort,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: '+17028868834'
      })
    .then(message => console.log(message.sid))
    .done();
    res.status(200).json({ message: 'SMS sent' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }

};

export default generateSMS;

