const Axios=require('axios')
const con=require('./config.json')

class MarketManager
{
    async EventEmit(name,data)
    {   
        
        try{
        const a=await Axios.get(con.GetAllInstalledApps_Api);
        for(let i=0;i<a.data.length;i++)
        {

            let frame = document.getElementById(a.data[i].appid);
            frame = frame ? frame.contentWindow : null;
            if(frame){
            frame.postMessage([name,data],a.data[i].src);
            }
        } 
    }
    catch(err)
    {
        throw err.response
    }
    }
    async Get(req)
    {
        try{
        const a=await Axios.get(con.GetAllInstalledApps_Api);
        const resp=await Axios.get(con.Get_Api+`${req}`);
        for(let i=0;i<a.data.length;i++)
        {
            
            let frame = document.getElementById(a.data[i].appid);
            frame = frame ? frame.contentWindow : null;
            if(frame)
            frame.postMessage([req,resp.data],a.data[i].src);
            
        } 
    }
    catch(err)
    {
        throw err.response
    }
    }
}
let Wrapper=new MarketManager();

//export default Wrapper;
module.exports=Wrapper

