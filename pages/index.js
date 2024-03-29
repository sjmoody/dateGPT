import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState,  useEffect } from 'react';

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
const [isGenerating, setIsGenerating] = useState(false);
const [hasGenerated, setHasGenerated] = useState(false);

const callTwilioEndpoint = async (smsBody) => {
  // console.log("Calling Twilio...")
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
  // console.log("Twilio replied...", output)
}

const callTwilioDebug = async (smsBody) => {
  // console.log("Calling Twilio to debug...")
  inputs && inputs.phoneNumber && console.log(`Expected body for POST call: ${JSON.stringify( { smsBody: smsBody, smsTo: inputs.phoneNumber })}`)
  const response = await fetch('/api/twilio', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ smsBody: smsBody, smsTo: inputs.phoneNumber }),
  });

  const data = await response.json();
  const { output } = data;
  // console.log("Twilio replied...", output)
}


const callGenerateEndpoint = async () => {
  setIsGenerating(true);

  console.log("Calling OpenAI...")
  console.log(`Expected body for POST call: ${JSON.stringify( { inputs: inputs })}`)
  // Log the inputs object with the values from the form
  // console.log(`Inputs:`)
  // console.log(inputs)

  fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ inputs }),
  })
  .then((response) => {
    if(!response.ok) {
      // let smsDebug = `Request to OpenAI failed. Inputs: ${JSON.stringify({inputs})}`;
      // await callTwilioDebug(smsDebug);
      console.log(`Error with OpenAI. response: ${response}`)
      alert(`Error. ${response.error}. \n Please reload the page and again.`);
      throw new Error(response.error);
    }
    return response.json();
  })
  .then((data) => {
    // Success
    const { output } = data;
    if(output) {
      console.log(`Output: ${output}`)
      let smsb = `Hi! I'm GPTCupid. Here are three ideas for dates ${inputs.name1} and ${inputs.name2} could try. \n  ${output.text} \n If you try one of these, let me know how it goes! \n -GPTCupid`;
      let smsDebug = `Request received from ${inputs.phoneNumber}. Response sent to user: \n Hi! I'm GPTCupid. Here are three ideas for dates ${inputs.name1} and ${inputs.name2} could try. \n  ${output.text} \n If you try one of these, let me know how it goes! \n -GPTCupid`;
      callTwilioDebug(smsDebug);

      setApiOutput(output)

      // callTwilioEndpoint(smsb)
    } // else try other out
    else {
      console.log(`Unable to figure out the output. Output: ${output}`)
    }
  })
  .then(() => {
    setIsGenerating(false);
    setHasGenerated(true);
  });
}

  const onUserChangedText = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputs({
      ...inputs,
      [name]: value
    })
  }



  return (
    <div className="root">
      <Head>
        <title>GPTCupid</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Tired of the Same Old Dates? Let GPT4 Help!</h1>
          </div>
          <div className="header-subtitle">
            <h2>Get Creative Date Ideas Tailored to You</h2>
          </div>
        </div>
        {!hasGenerated && (
                  <div className="prompt-container">
                  <input
                    placeholder="Your name"
                    className="prompt-box"
                    name="name1"
                    maxLength="25"
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
                    maxLength="25"
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
                    maxLength="25"
                    value={inputs.city}
                    onChange={onUserChangedText}
                    />
                  <input
                    placeholder="Day of the Week"
                    className="prompt-box"
                    name="dayOfWeek"
                    maxLength="10"
                    value={inputs.dayOfWeek}
                    onChange={onUserChangedText}
                    />
                  <input
                    placeholder="What vibe do you want?"
                    className="prompt-box"
                    name="dateVibes"
                    maxLength="20"
                    value={inputs.dateVibes}
                    onChange={onUserChangedText}
                    />
                  <input
                    placeholder="Your phone number"
                    className="prompt-box"
                    name="phoneNumber"
                    maxLength="16"
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
                </div>
        )}


              {apiOutput && hasGenerated && (
                  <div className="output">
                    <div className="output-header-container">
                      <div className="output-header">
                        <h3>GPT says...</h3>
                      </div>
                    </div>
                    <div className="output-content">
                      <pre>{apiOutput}</pre>
                      </div>
                      <div>
                        <button
                          id="tweet-button"
                          className="tweet-button"
                          onClick={() => {
                            console.log(`tweeting. Text: ${apiOutput}`)
                            const tweetText=`AI just gave me a date idea! ${apiOutput}`
                            const tweetShort = tweetText.substring(0, 214)
                            const tweetPayload = (`${tweetShort}... \nGet your own ideas at www.gptcupid.com. c/o @sjmoody`)
                            const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetPayload)}`;
                            window.open(tweetUrl);

                          }}
                          >
                            Tweet this
                            </button>
                          <button
                            id="try-again-button"
                            className="try-again-button"
                            onClick={() => {
                              setIsGenerating(false);
                              setHasGenerated(false);
                              setApiOutput(null);
                              setInputs({
                                name1: "",
                                personality1: "",
                                gender1: "",
                                name2: "",
                                personality2: "",
                                gender2: "",
                                city: "",
                                dayOfWeek: "",
                                dateVibes: "",
                                phoneNumber: ""
                              })
                            }}
                            >
                              Try Again
                          </button>
                      </div>
                    </div>

                )}


      </div>

    </div>
  );
};

export default Home;
