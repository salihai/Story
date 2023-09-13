const fetch = require('node-fetch');
require('dotenv').config();

//const num = 0;

let newPrompt = "Tell a story. However, while telling the story, stop at a point and ask the user a question with options A, B, C that will change the flow of the story depending on the answer.";
let messg = "";

const createStory = async () => {

    let id=0;

    while(id<3){

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
                text: newPrompt,
                chatbot_global_action: 'You are a story teller.',
                previous_history: [
                {
                    role: 'user',
                    message: newPrompt
                },
                {role: 'assistant', message: messg}
                ]
            })

        })

        const generatedText = await res.json();
        
        console.log(generatedText.openai.generated_text);

        id++;

        if(id!==0){
            newPrompt="User's answer: Option A. Continue the story based on the answer and keep asking questions.";
            messg = generatedText.openai.generated_text;
        }

        
    }

    

};

module.exports = {
    createStory : createStory
}
