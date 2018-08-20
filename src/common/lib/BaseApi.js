import ApiManager from './ApiManager'

const baseUrl = 'https://jsonplaceholder.typicode.com'

class ChaofaApi {
  constructor() {
    this.apiManager = new ApiManager(baseUrl)
  }

  getPosts() {
    return this.apiManager.fetch({
      ep: '/posts',
    })
  }

  getPost(id) {
    return this.apiManager.fetch({
      ep: `/posts/${id}`,
    })
  }
}

export default new ChaofaApi()
