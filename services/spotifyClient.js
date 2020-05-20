const config = require('config');
const axios = require('axios')
const qs = require('qs');

const baseUrlApi = config.rest_endpoints.spotify;
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

module.exports.getToken = getToken;