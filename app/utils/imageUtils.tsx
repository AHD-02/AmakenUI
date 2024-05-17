

export const imageUrlResolver = (url: string) => {
    if(!url){
        return "";
    }
    if(url.includes("https")){
        return url;
    } else {
        return `https://${url}`;
    }
}