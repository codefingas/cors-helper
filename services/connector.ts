import ax, { AxiosStatic } from "axios";
import axiosRetry, { isNetworkOrIdempotentRequestError } from "axios-retry";
import http from "http";
import https from "https";


export const axios = (url: string, headers?: Headers) => {

    /**
     * attach url * done
     * attach headers * done
     * make api calls
     * test package.
     * 
     */

    const heads = JSON.stringify(headers);

    const axios = ax.create({
        baseURL: `http://localhost:8080/proxy?url=${url}&headers=${heads}`,
        httpAgent: new http.Agent({ keepAlive: true }),
        httpsAgent: new https.Agent({ keepAlive: true })
    });

    //incase of failures or what not.
    /**
     * TODO: 
     * will reuse or uncomment the retryCondition method and retryDelay method if requests error out within specified conditions
     * 
     */

    axiosRetry(axios, {
        // retryDelay: () => {}, - will uncomment and utilize retry delay method when requesting server needs rate limiting.
        retries: 3,
        // retryCondition: (error) => isNetworkOrIdempotentRequestError(error) || error?.response?.status !== 200 
    });


    return axios;
};