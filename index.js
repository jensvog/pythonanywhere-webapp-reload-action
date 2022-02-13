const core = require('@actions/core');
const axios = require('axios');

try {
    const host = core.getInput('host');
    const username = core.getInput('username');
    const apiToken = core.getInput('api-token');
    const domainName = core.getInput('domain-name');

    const url = `https://${host}/api/v0/user/${username}/webapps/${domainName}/reload/`

    console.log('Trying to reload webapp...')
    
    axios.post(url, null, {
        headers: {"Authorization" : `Token ${apiToken}`}
    })
    .then(function (response) {
        console.log('Reloaded webapp successfully.')
    })
    .catch(function (error) {
        core.setFailed(error.message);
    });
} catch (error) {
    core.setFailed(error.message);
}