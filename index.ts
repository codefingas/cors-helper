import { axios } from "./services/connector";
import {CorsHelper} from "./types/types";


exports.helper = function(url: string, headers?: Headers): CorsHelper{
     return axios(url, headers);
};