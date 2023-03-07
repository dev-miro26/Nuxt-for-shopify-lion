// To convert to JS, remove the type imports and the type declarations
// e.g. : VercelRequest 
import { ServerMiddleware } from '@nuxt/types'
import { VercelResponse, VercelRequest, VercelApiHandler } from '@vercel/node'

const helpers = require('./helpers'); 

const vercel: ServerMiddleware = async (req, res, next) => {

    const body = req.read()


    const apiNameRegex = /\/([\w-]+).*/g

    const matches = apiNameRegex.exec(req.url || "");

    if (!matches || !matches[1]) {
        res.statusCode = 404;
        res.end()
        return;
    }

    const apiName = matches[1];
    const moduleName = '../api/' + apiName;

    // allow dynamic code change reloads - possibly detect changes and remove that way
    const requestedApi = requireReload(moduleName).default as VercelApiHandler;

    const vercelRequest: VercelRequest = helpers.httpToVercelRequest(req, body);
    const vercelResponse: VercelResponse = helpers.httpToVercelResponse(req, res);

    try {
        requestedApi(vercelRequest, vercelResponse)
    } catch (err) {
        console.error(err)
        res.statusCode = 500;
        res.end()
    }
}

/// https://stackoverflow.com/a/58645175/59532
function requireReload(moduleName: string) {

    let mp = require.resolve(moduleName)
    if (require.cache[mp]) {
        delete require.cache[mp]
        console.log(`[clear] module: ${mp}`)
    }
    return require(moduleName);
}


export default vercel;
