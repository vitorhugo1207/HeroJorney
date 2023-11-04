import { rejects } from "assert";
import { resolve } from "path";

export default class Heros{
  constructor() {
    this.requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
  };

  getHeros() {
    return new Promise((resolve, reject) => {
      fetch("http://homologacao3.azapfy.com.br/api/ps/metahumans", this.requestOptions)
        .then(response => response.json())
        .then(result => resolve(result))
        .catch(error => reject(error));
    })
  }
}
