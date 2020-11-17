const fs = require('fs');
const request = require('request');
const ytdl = require('ytdl-core');



const str = (value, start, end) => { 
  if(!value || !start || !end)
    return false;

  
  var first = value.split(start)[1]
  if(!first)
    return false
  
  var second = first.split(end)[0];
  if(!second)
    return false;

  return second;
};

const sleep = seconds => new Promise(resolve => setTimeout(resolve, seconds * 1000));

function curl(config){
  return new Promise(resolve => {
    request(config, (error, response, body) => resolve({ error, response }));
  });
}

const dir = __dirname+'\\downloads\\';

const remCharactersIncorrect = function(text){
  const charactersErros = `#%&{}\<>*?/$!'":@+=`;
  for(var char of charactersErros){
    text = text.split(char).join("")
  }
  console.log({text});
  return text;
}

module.exports = {
  async downloader(url, format, options={}){
    try{
      const videoID = await ytdl.getURLVideoID(url);

      const videoInfo = await ytdl.getInfo(videoID);
      if(!videoInfo)
        return { error : "video not found" }

      var titleOld = videoInfo.videoDetails.title || videoInfo.title
      
      const title = remCharactersIncorrect(titleOld);
      
      const urlConvert = `https://www.youtube.com/watch?v=${videoID}`;

      ytdl(urlConvert, options).pipe(fs.createWriteStream(`${dir}${title}.${format}`));
      
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
  },
  async searchApi(query){
    if(!query) return { error: "Você precisa digitar algo para pesquisar" }

    const baseURL = `https://www.youtube.com/results?search_query=${query.split(' ').join('+')}`
  
    const { error, response } = await curl({ url: `${baseURL}${query}` })
    if(error) return { error: "Problemas ao procurar os videos" }

    if(response.body.includes('Nenhum resultado encontrado'))
      return { error: "Nenhum video foi encontrado" }

    try{
      var codeSepare = str(response.body, "var ytInitialData = ", "// scraper_data_end");
      if(!codeSepare)
        return { error: "Erro ao tentar separar os dados" }

      var date = codeSepare.replace(';', '');
    
      var convJSON = JSON.parse(date);

      var videos = convJSON.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents;
      
      var videosFilters = videos.filter(video => !!video.videoRenderer)
      if(!(videosFilters.length > 0))
        return { error: "Falha ao filtrar os videos." }

      var arrayNew = videosFilters.map(video => {
        return video.videoRenderer;
      })

      if(!(arrayNew.length > 0))
        return { error: "Falha ao filtrar os videos" }

      await sleep(1);
      return { response: arrayNew }

    }catch(error){
      return { error }
    }
  }
}