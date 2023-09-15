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
  );