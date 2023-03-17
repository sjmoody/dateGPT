import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = "Writing in the voice of a dating coach, suggest three dates for a couple, based on their personality types and location. Describe what each person would enjoy about the date, based on their personality types. Use specific details.  \n";
const generateAction = async (req, res) => {
  console.log(`calling generateAction function...`);

  // Use this to debug the request body
  // res.status(500).json({ error: `An error occurred while generating the output` });

  try {
    const inputs = req.body.inputs;

    const name1 = inputs.name1 ? `\nName: ${inputs.name1}` : ``

    const personality1 = inputs.personality1 ? `\nPersonality type: ${inputs.personality1}`: ``
    const gender1 = inputs.gender1 ? `\nGender: ${inputs.gender1}` : ``

    const name2 = inputs.name1 ? `\nName: ${inputs.name2}` : ``

    const personality2 = inputs.personality1 ? `\nPersonality type: ${inputs.personality2}`: ``
    const gender2 = inputs.gender1 ? `\nGender: ${inputs.gender2}`: ``

    const city = inputs.city ? `\nCity: ${inputs.city}` : `\nCity: Paris, France`
    const dayOfWeek = inputs.dayOfWeek ? `\nDay of the week: ${inputs.dayOfWeek}` : `\nDay of the week: Friday`
    const dateVibes = inputs.dateVibes ? `\nDate vibes: ${inputs.dateVibes}` : `\nDate vibes: Romantic`
    let personDetails1 = ``
    let personDetails2 = ``

    if (name1 || personality1 || gender1) {
      personDetails1 = `\nPerson 1: ${name1} ${personality1} ${gender1} \n`
    }

    if (name2 || personality2 || gender2) {
      personDetails2 = `\nPerson 2: ${name2} ${personality2} ${gender2} \n`
    }

    const basePromptInputs = `${personDetails1} ${personDetails2} ${city} ${dayOfWeek} ${dateVibes} \n`

    console.log(`API: ${basePromptPrefix}${basePromptInputs}`)


    const baseCompletion = await openai.createCompletion({
      model: 'gpt-4',
      prompt: `${basePromptPrefix}${basePromptInputs}`,
      temperature: 0.70,
      max_tokens: 500,
    });

    const basePromptOutput = baseCompletion.data.choices.pop();
    res.status(200).json({ output: basePromptOutput });
  } catch (error) {
    console.log(`Error running openAI completion: ${error}`);
    res.status(500).json({ error: error.message });
  }

};

export default generateAction;