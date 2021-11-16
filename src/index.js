import 'normalize.css'
import Init from '@/components/index'
import { dataList } from './common'

import '@/assets/css/index.scss'
import '@/assets/css/listView.scss'
import { getStorage } from './utils'

(() => {
  init()
  
  function init() {
    const collectList = getStorage('collectList', { isJson: true, defaultValue: '[]' })
    const collectIdList = getStorage('collectIdList', { isJson: true, defaultValue: '{}' })
    const container = document.querySelector('#app')
    const app = new Init({
      el: container,
      data: dataList,
      collectList,
      collectIdList
    })
    app.init()
  }
})()
