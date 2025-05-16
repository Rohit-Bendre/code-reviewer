const {GoogleGenerativeAI}=require("@google/generative-ai");
require("dotenv").config();

const genAI=new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);
const model=genAI.getGenerativeModel({
    model:"gemini-2.0-flash",
    systemInstruction:`you are an code reviewer and you have experties in programming in all programming languages and frameworks,
    and you look for the problems in code given by the users, tell users the erroe in their code,and give suggestions regarding to the code.
    give the main error and suggestion in short, dont give full documentation for short errors and sugestions , give the output in a readable points and lists form, give in managed form,make small paragraphs and ines of the answer, dont give extra and unnecessary inforation add what to do and what not to do points with the right and wrong cross emoji, and lastly provide the correct code by solving the problem,`
});



async function generateContent(prompt){
    const result=await model.generateContent(prompt);
    return result.response.text();

}

module.exports = generateContent;
