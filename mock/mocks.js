import user from './user'
import role from './role'
import article from './article'
import search from './remoteSearch'
import config from './config'

export default [
  ...user,
  ...role,
  ...article,
  ...search,
  ...config
]

