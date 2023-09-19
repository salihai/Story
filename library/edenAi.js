const fetch = require('node-fetch');
require('dotenv').config();


const createStory = async (option, words, prompt, history) => {

    let firstPrompt;

    if(prompt==='1'){
        firstPrompt = `Tell a story using these 10 words: ${words}. However, while telling the story, stop at a point and ask the user a question with options A, B, C that will change the flow of the story depending on the answer.`;
    }else if(prompt==='2'){
        firstPrompt = `User's answer: Option ${option}. Continue the story based on the answer and keep asking questions and give options A, B, C with answers.`;
    }else if(prompt==='3'){
        firstPrompt = `User's answer: Option ${option}. Finish the story based on the answer please.`;
    }
    
    let historyAssistant = history;
    
    const res = await fetch('https://api.edenai.run/v2/text/chat',{
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            authorization: process.env.API_KEY_EDEN
        },
        body: JSON.stringify({
            response_as_dict: true,
            attributes_as_list: false,
            show_original_response: false,
            temperature: 0.7,
            max_tokens: 500,
            providers: 'openai',
            text: firstPrompt,
            chatbot_global_action: 'You are a story teller.',
            previous_history: [
            {
                role: 'user',
                message: firstPrompt
            },
            {role: 'assistant', message: historyAssistant}
            ]
        })
    });

    const generatedText = await res.json();

    return generatedText.openai.generated_text;

};

module.exports = {
    createStory : createStory
}
