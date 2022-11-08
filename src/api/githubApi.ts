import axios from 'axios'

export const githubApi = axios.create({
  baseURL: 'https://api.github.com/repos/facebook/react',
  headers: {
    Authorization:
      'Bearer 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',
  },
})
