const fetch = require('node-fetch');
require('dotenv').config();


const createStory = async (option, start, Continue, finish) => {


    let firstPrompt = "Tell a story. However, while telling the story, stop at a point and ask the user a question with options A, B, C that will change the flow of the story depending on the answer.";
    let historyAssistant = "";
    
    let book = [[], []];

    let num=0;

    while(num<3){

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

        })

        const generatedText = await res.json();
        
        book[0].push(generatedText.openai.generated_text.split('A)')[0]);
        
        book[1].push("A)"+generatedText.openai.generated_text.split('A)')[1]);

        num++;

        if(num!==0){
            let newPrompt=`User's answer: Option ${option}. Continue the story based on the answer and keep asking questions.`;
            firstPrompt = newPrompt;
            historyAssistant = generatedText.openai.generated_text;
        }
    }

    return book;

};

module.exports = {
    createStory : createStory
}
