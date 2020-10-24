const fs = require('fs');
const ytdl = require('ytdl-core');

const dir = __dirname+'\\downloads\\';

module.exports = {
  async downloader(url, format, options={}){
    try{
      const videoID = await ytdl.getURLVideoID(url);

      const videoInfo = await ytdl.getInfo(videoID);
      if(!videoInfo)
        return { error : "video not found" }

      const title = videoInfo.videoDetails.title;

      ytdl(url, options).pipe(fs.createWriteStream(`${dir}${title}.${format}`));
      return { response: { filename:`${title}.${format}`, title, message: "Download with success!" } }
    }catch(error){
      return { error: "Ocorreu algum erro na conversão" }
    }
  },
  async getInfo(url){
    try{
        const videoID = await ytdl.getURLVideoID(url);

        const videoInfo = await ytdl.getInfo(videoID);
        if(!videoInfo)
          return { error : "video not found" }

        const videoDetails = videoInfo.videoDetails;
        return { response: videoDetails }
      }catch(error){
        return { error: "Video não encontrado" }
      }
    }
}