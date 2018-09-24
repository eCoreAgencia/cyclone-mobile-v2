export default class resquestHTTP {

    get(url){
        return fetch(url)   
    }


}

window.resquestHTTP = new resquestHTTP();