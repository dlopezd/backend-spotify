const config = require('config');
const axios = require('axios')
const qs = require('qs');

const baseUrlApi = config.rest_endpoints.spotify_api;
const baseUrlAccounts = config.rest_endpoints.spotify_accounts

const getToken = async _ => {
    const path = 'token';

    try {
        const credentialsUncoded = `${config.client_id}:${config.client_secret}`;
        let buff = new Buffer(credentialsUncoded);
        let credentialsEncoded = buff.toString('base64');

        let response = await axios({
            method: 'post',
            url: baseUrlAccounts + path,
            withCredentials: true,
            data: qs.stringify({ 'grant_type': 'client_credentials' }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "Authorization": `Basic ${credentialsEncoded}`
            }
        });

        return response.data;

    } catch (error) {
        console.log(error);
    }
}

const search = async (searchInfo, authorizationInfo) => {

    let path = "search?" + qs.stringify(searchInfo);

    try {
        const headers = {
            "Authorization": `Bearer ${authorizationInfo.access_token}`
        };

        const response = await axios.get(baseUrlApi + path, { headers })
        return response.data;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}

module.exports.search = search;
module.exports.getToken = getToken;