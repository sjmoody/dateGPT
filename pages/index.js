import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';

const Home = () => {

  const [inputs, setInputs] = useState({
    name1: "",
    personality1: "",
    gender1: "",
    name2: "",
    personality2: "",
    gender2: "",
    city: "",
    dayOfWeek: "",
    phoneNumber: "",
    dateVibes: ""
  })


const [apiOutput, setApiOutput] = useState('')
const [isGenerating, setIsGenerating] = useState(false)

const callTwilioEndpoint = async (smsBody) => {
  console.log("Calling Twilio...")
  console.log(`Expected body for POST call: ${JSON.stringify( { smsBody: smsBody, smsTo: inputs.phoneNumber })}`)
  const response = await fetch('/api/twilio', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ smsBody: smsBody, smsTo: inputs.phoneNumber }),
  });

  const data = await response.json();
  const { output } = data;
  console.log("Twilio replied...", output)
}

const callTwilioDebug = async (smsBody) => {
  console.log("Calling Twilio to debug...")
  inputs && inputs.phoneNumber && console.log(`Expected body for POST call: ${JSON.stringify( { smsBody: smsBody, smsTo: inputs.phoneNumber })}`)
  // console.log(`Expected body for POST call: ${JSON.stringify( { smsBody: smsBody, smsTo: inputs.phoneNumber })}`)
  const response = await fetch('/api/twilio', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ smsBody: smsBody, smsTo: inputs.phoneNumber }),
  });

  const data = await response.json();
  const { output } = data;
  console.log("Twilio replied...", output)
}


const callGenerateEndpoint = async () => {
  setIsGenerating(true);

  console.log("Calling OpenAI...")
  console.log(`Inputs: ${inputs}`)
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ inputs }),
  });

  const data = await response.json();
  const { output } = data;
  console.log("OpenAI replied...", output.text)
  // setApiOutput(`The date ideas will be sent to your phone number: ${inputs.phoneNumber}`)

  let smsb = `Hi! I'm DateGPT. Here are three ideas for dates ${inputs.name1} and ${inputs.name2} could try. \n  ${output.text} \n If you try one of these, let me know how it goes! \n -DateGPT`;
  setApiOutput(smsb);

  let smsDebug = `Request received from ${inputs.phoneNumber}. Response sent to user: \n Hi! I'm DateGPT. Here are three ideas for dates ${inputs.name1} and ${inputs.name2} could try. \n  ${output.text} \n If you try one of these, let me know how it goes! \n -DateGPT`;
  console.log(`to send for debugging: ${smsDebug}`);

  await callTwilioDebug(smsDebug);
  console.log("Finished call to Twilio endpoint.")
  // await setSmsBody(smsb);
  // console.log("set SMS Body")
  // await callTwilioEndpoint(smsb);
  // console.log("Finished call to Twilio endpoint.")

  setIsGenerating(false);
}

  const onUserChangedText = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log(`Change made to ${name}. New value: ${value}`)
    setInputs({
      ...inputs,
      [name]: value
    })
  }

  return (
    <div className="root">
      <Head>
        <title>DateGPT</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Tired of the Same Old Dates? Let AI Help!</h1>
          </div>
          <div className="header-subtitle">
            <h2>Get Creative Date Ideas Tailored to You</h2>
          </div>
        </div>
        <div className="prompt-container">
          <input
            placeholder="Your name"
            className="prompt-box"
            name="name1"
            value={inputs.name1}
            onChange={onUserChangedText}
            />
          <select
            placeholder="Select your personality"
            className="prompt-select"
            name="personality1"
            value={inputs.personality1}
            onChange={onUserChangedText}
            >
              <option value="" disabled>Your Personality</option>
              <option value="ENTP">ENTP</option>
              <option value="INTP">INTP</option>
              <option value="ENTJ">ENTJ</option>
              <option value="INTJ">INTJ</option>
              <option value="ESTP">ESTP</option>
              <option value="ISTP">ISTP</option>
              <option value="ESTJ">ESTJ</option>
              <option value="ISTJ">ISTJ</option>
              <option value="ENFP">ENFP</option>
              <option value="INFP">INFP</option>
              <option value="ENFJ">ENFJ</option>
              <option value="INFJ">INFJ</option>
              <option value="ESFP">ESFP</option>
              <option value="ISFP">ISFP</option>
              <option value="ESFJ">ESFJ</option>
              <option value="ISFJ">ISFJ</option>
            </select>
          {/* <select




          {/* <input
            placeholder="your personality type"
            className="prompt-box"
            name="personality1"
            value={state.personality1}
            onChange={onUserChangedText}

            /> */}
          {/* <select
            placeholder="your zodiac"
            className="prompt-box"
            name="zodiac1"
            value={inputs.zodiac1}
            onChange={onUserChangedText}
          >
            <option value="Aries">Aries</option>
            <option value="Taurus">Taurus</option>
            <option value="Gemini">Gemini</option>
            <option value="Cancer">Cancer</option>
            <option value="Leo">Leo</option>
            <option value="Virgo">Virgo</option>
            <option value="Libra">Libra</option>
            <option value="Scorpio">Scorpio</option>
            <option value="Sagittarius">Sagittarius</option>
            <option value="Capricorn">Capricorn</option>
            <option value="Aquarius">Aquarius</option>
            <option value="Pisces">Pisces</option>
          </select> */}

{/*
          <input
            placeholder="your zodiac"
            className="prompt-box"
            name="zodiac1"
            value={state.zodiac1}
            onChange={onUserChangedText}
            /> */}
          {/* <input
            placeholder="your gender"
            className="prompt-select"
            name="gender1"
            value={inputs.gender1}
            onChange={onUserChangedText}
            /> */}
          <select
            placeholder="Your gender"
            className="prompt-select"
            name="gender1"
            value={inputs.gender1}
            onChange={onUserChangedText}
            >
            <option value="" disabled>Your gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            </select>
          <input
            placeholder="Their name"
            className="prompt-box"
            name="name2"
            value={inputs.name2}
            onChange={onUserChangedText}
            />
          <select
            placeholder="Their personality"
            className="prompt-select"
            name="personality2"
            value={inputs.personality2}
            onChange={onUserChangedText}
            >
              <option value="" disabled>Their Personality</option>
              <option value="ENTP">ENTP</option>
              <option value="INTP">INTP</option>
              <option value="ENTJ">ENTJ</option>
              <option value="INTJ">INTJ</option>
              <option value="ESTP">ESTP</option>
              <option value="ISTP">ISTP</option>
              <option value="ESTJ">ESTJ</option>
              <option value="ISTJ">ISTJ</option>
              <option value="ENFP">ENFP</option>
              <option value="INFP">INFP</option>
              <option value="ENFJ">ENFJ</option>
              <option value="INFJ">INFJ</option>
              <option value="ESFP">ESFP</option>
              <option value="ISFP">ISFP</option>
              <option value="ESFJ">ESFJ</option>
              <option value="ISFJ">ISFJ</option>
            </select>

          {/* <input
            placeholder="their type"
            className="prompt-box"
            name="personality2"
            value={state.personality2}
            onChange={onUserChangedText}
            /> */}
          {/* <select
            placeholder="their zodiac"
            className="prompt-box"
            name="zodiac2"
            value={inputs.zodiac2}
            onChange={onUserChangedText}
          >
            <option value="Aries">Aries</option>
            <option value="Taurus">Taurus</option>
            <option value="Gemini">Gemini</option>
            <option value="Cancer">Cancer</option>
            <option value="Leo">Leo</option>
            <option value="Virgo">Virgo</option>
            <option value="Libra">Libra</option>
            <option value="Scorpio">Scorpio</option>
            <option value="Sagittarius">Sagittarius</option>
            <option value="Capricorn">Capricorn</option>
            <option value="Aquarius">Aquarius</option>
            <option value="Pisces">Pisces</option>
          </select> */}
{/*
          <input
            placeholder="their zodiac"
            className="prompt-box"
            name="zodiac2"
            value={state.zodiac2}
            onChange={onUserChangedText}
            /> */}
          <select
            placeholder="Their gender"
            className="prompt-select"
            name="gender2"
            value={inputs.gender2}
            onChange={onUserChangedText}
            >
            <option value="" disabled>Their gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            </select>
          <input
            placeholder="City"
            className="prompt-box"
            name="city"
            value={inputs.city}
            onChange={onUserChangedText}
            />
          <input
            placeholder="Day of the Week"
            className="prompt-box"
            name="dayOfWeek"
            value={inputs.dayOfWeek}
            onChange={onUserChangedText}
            />
          <input
            placeholder="What vibe do you want?"
            className="prompt-box"
            name="dateVibes"
            value={inputs.dateVibes}
            onChange={onUserChangedText}
            />
          <input
            placeholder="Use the format +13054192786"
            className="prompt-box"
            name="phoneNumber"
            value={inputs.phoneNumber}
            onChange={onUserChangedText}
            />

        <div className="prompt-buttons">
          <a
            className={isGenerating ? `generate-button loading` : `generate-button`}
            onClick={callGenerateEndpoint}
            >
            <div className="generate">
              {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
            </div>
          </a>
        </div>
        {apiOutput && (
          <div className="output">
            <div className="output-header-container">
              <div className="output-header">
                <h3>Output</h3>
              </div>
            </div>
            <div className="output-content">
              <pre>{apiOutput}</pre>
              </div>
            </div>

        )}


        </div>
      </div>
      {/* <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div> */}
    </div>
  );
};

export default Home;
