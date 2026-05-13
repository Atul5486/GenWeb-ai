const extractJson=async(text)=>{
    if(!text){
        return;
    }
    const cleanCode=text
                .replace(/```json/gi,"")
                .replace(/```/g,"")
                .trim();

    const firstBrace=cleanCode.indexOf('{')
    const lastBrace=cleanCode.lastIndexOf('}')
    if(firstBrace===-1 || lastBrace===-1) return null;
    const jsonString=cleanCode.slice(firstBrace,lastBrace+1);
    
    return JSON.parse(jsonString)
}
export default extractJson;