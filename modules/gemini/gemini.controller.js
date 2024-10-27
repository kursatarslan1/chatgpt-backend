
const geminiService = require("./gemini.service")


async function sendMessage(req, res){
    try{
        const message = await geminiService.createMessage(req.body);
        if(!message){
            return res.status(400).json({ message: "Beklenmedik bir hata meydana geldi." });
        }
        return res.status(200).json({ reply: message });
    } catch (error){
        return res.status(500).json({ error: "Server Error" });
    }
}


module.exports = {
    sendMessage,
};
