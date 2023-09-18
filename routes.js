// This file was automatically added by edgio init.
// You should commit this file to source control.
import { Router, edgioRoutes, HTTP_HEADERS } from '@edgio/core'

export default new Router()
  // automatically adds all routes from the Node.js connector
  .use(edgioRoutes)

  // will deny access for all pages with denyAccess=true in url
  .if(
    {
      edgeControlCriteria: {
        "===": [{ "request.origin_query": "denyAccess" }, "true"],
      },
    },
    { access: { deny_access: true } } //
  )

  // Combining status code 401 with the WWW-Authenticate response header allows you to prompt a user for authentication.
  .if(
    {
      edgeControlCriteria: {
        "===": [{ "request.origin_query": "tokenAuth" }, "true"],
      },
    },
    { access: { token_auth: true } }
  )

  // Determines whether URL comparisons made by the following Token-Based Authentication parameters are case-sensitive:
  //   ec_url_allow
  //   ec_ref_allow
  //   ec_ref_deny
  // NOTE: token auth not supposed to work currently in Edgio v7
  .if(
    {
      edgeControlCriteria: {
        "===": [{ "request.origin_query": "ignoreToken" }, "true"],
      },
    },
    { access: { token_auth_ignore_url_case: true } }
  );