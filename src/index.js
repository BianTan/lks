import 'normalize.css'
import Init from '@/components/index'
import GlobalListener from './GlobalListener'
import { dataList } from './common'

import '@/assets/css/index.scss'
import '@/assets/css/list-view.scss'
import '@/assets/css/app-header.scss'
import { getStorage } from './utils'

(() => {
  init()
  
  function init() {
    // 获取储存的数据
    const collectList = getStorage('collectList', { isJson: true, defaultValue: '[]' })
    const config = getStorage('config', { isJson: true, defaultValue: '{ "closed": true }' })
    
    const container = document.querySelector('#app')
    
    const app = new Init({
      el: container,
      data: dataList,
      collectList,
      config
    })
    app.init()
    // 全局 事件监听器
    new GlobalListener()
  }
})()
