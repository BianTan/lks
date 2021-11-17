import Component from '../Component'
import { setStorage, getStorage } from '@/utils'

export default class AppHeader {
  
  constructor(options) {
    this.container = options.container
    this.config = options.config || {}
  }
  
  // 渲染
  render() {
    this.container.innerHTML = Component.appHeaderView()
    this.setModeData()
  }
  
  // 更换模式
  setModeData(defaultMode = null) {
    let mode = defaultMode ? defaultMode : this.config['mode']
    if (!mode) mode = 'auto'
    if (!mode || defaultMode) {
      const config = getStorage('config', { isJson: true, defaultValue: '{ "closed": true }' })
      setStorage('config', { ...config, mode })
    }
    document.querySelector('body').setAttribute('color-mode', mode)
  }
  
  // 主题切换
  handleThemeChange(e) {
    let { value } = e.currentTarget.dataset
    let mode
    switch (value) {
      case 'light':
        mode = "light"
        break;
      case 'dark':
        mode = "dark"
        break;
      case 'auto':
        mode = "auto"
        break;
    }
    this.setModeData(mode)
  }
  
  // 绑定事件
  bindEvent() {
    Array.from(document.querySelectorAll('.form-item svg')).forEach((ele) => {
      ele.addEventListener('click', this.handleThemeChange.bind(this), false)
    })
    document.querySelector('.form-item').addEventListener('click', (e) => {
      e.currentTarget.classList.toggle('mode--open')
      e.stopPropagation()
    })
  }
  
}
