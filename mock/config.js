import Mock from 'mockjs'

const List = []
const count = 100

const baseContent = '<p>我是测试数据我是测试数据</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: i,
    config_key: 'config_key ' + i,
    config_content: 'config_content' + i,
    config_value: 'config_value' + i,
    remark: 'remark' + i,
    sort_num: i,
    content: baseContent,
    image_uri
  }))
}

export default [
  {
    url: '/sys-config/list',
    type: 'get',
    response: config => {
      const { importance, type, title, page = 1, limit = 20, sort, config_key, config_value } = config.query
      let mockList = List.filter(item => {
        if (importance && item.importance !== +importance) return false
        if (type && item.type !== type) return false
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })
      if (sort === '-id') {
        mockList = mockList.reverse()
      }
      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList,
          listQuery: {
            config_key: config_key,
            config_value: config_value
          }
        }
      }
    }
  },
  {
    url: '/sys-config/add',
    type: 'post',
    response: param => {
      return {
        code: 20000,
        str: 'success'
      }
    }
  },
  {
    url: '/sys-config/delete',
    type: 'post',
    response: params => {
      const { id } = params.query
      console.log('id=' + id)
      return {
        code: 20000,
        str: 'success'
      }
    }
  },
  {
    url: '/sys-config/edit',
    type: 'post',
    response: params => {
      const { id } = params.query
      console.log('id=' + id)
      return {
        code: 20000,
        str: 'success',
        data: {
          obj: List[id]
        }
      }
    }
  }

]

