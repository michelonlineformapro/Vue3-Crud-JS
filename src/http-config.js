import axios from "axios";
//Client HTTP basé sur la promesse pour le navigateur et node.js

//La routes des livres json-server/produits
//Ajout des options dans le header pour autorise CORS + le format Json
export default axios.create({
    baseURL: "http://localhost:3001/",
    headers:{
        "Access-Control-Allow-Origin": "*",
        "Content-type" : "application/json"
    }
})