

/**
 * 
 * @param {*} searchfunc function used for searching provided by caller
 * @param {*} waittime time to wait between subsequent calls
 * @returns 
 */
export function debouncesearch (searchfunc:any , waittime:number){
    let timeout:any
    // console.log(searchfunc+"hihii")
   return (...args:any)=>{
        return new Promise((resolve,reject)=>{
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                try {
                    const result = searchfunc(...args)
                    resolve(result)
                } catch (error) {
                    reject(error)
                }
            }, waittime);
        })
   }
    // clearTimeout(var2);
    
    // var1 = setTimeout(()=>{
    //     let res = searchfunc(var1)

    // }, waittime)

}

export const urlcheck = (url:string)=>{
    
    const pattern = new RegExp(
        '^(https?:\\/\\/)?' + // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
          '(\\#[-a-z\\d_]*)?$', // fragment locator
        'i'
      );

      return pattern.test(url)
}

export const getrooturl = (fetchurl:string)=>{
    const val = new RegExp("https?://([^/]+)")
           const valcheck = val.exec(fetchurl)
           return valcheck ? valcheck[0] : ""
}

///tags list 

export let tagsjson = [
    "ideas",
    "technology",
    "food",
    "family",
    "festival",
    "poet",
    "poetry"
]

export const searchtags = (text:string)=>{
    console.log("inside search tags")
    const res = tagsjson.filter((tag)=>{
        if(text.toLocaleLowerCase()===text){
            return true;
        }
    })
    return res;
}