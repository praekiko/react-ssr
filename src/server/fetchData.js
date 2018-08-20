import { matchPath } from 'react-router-dom'

import { combinedRoutes } from 'common/routes'

const fetchData = (store, req) => {
  const promises = []

  combinedRoutes.forEach(route => {
    const { path, query, originalUrl } = req
    const match = matchPath(path, route)

    if (match && route.component.fetchData) {
      promises.push(
        route.component.fetchData(store, {
          match: { ...match, query, originalUrl },
        })
      )
    }
  })

  return promises
}

export default fetchData
