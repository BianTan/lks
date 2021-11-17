import AppHeader from './AppHeader'
import FolderView from './FolderView'
import ListView from './ListView'

export default class Init {
  constructor({ el, data, collectList, config }) {
    this.el = el
    this.data = data || []
    this.collectList = collectList || []
    this.config = config
    // 创建容器
    this.headerWrapper = document.createElement('div')
    this.headerWrapper.classList.add('container')
    this.topWrapper = document.createElement('div')
    this.topWrapper.classList.add('container')
    this.listWrapper = document.createElement('div')
    this.listWrapper.classList.add('container')
    this.listWrapper.classList.add('data-list')
  }
  
  init() {
    this.createComponents()
    this.render()
    this.bindEvent()
  }
  
  createComponents() {
    // 顶部
    this.header = new AppHeader({
      container: this.headerWrapper,
      config: this.config
    })
    // 收藏夹
    this.top = new FolderView({
      title: '收藏夹',
      container: this.topWrapper,
      data: this.collectList,
      isTop: true
    })
    // 期数列表
    this.list = new ListView({
      container: this.listWrapper,
      data: this.data,
      closed: this.config['closed'],
      collectList: this.collectList
    })
  }
  
  render() {
    this.header.render()
    this.top.render()
    this.list.render()
    this.el.appendChild(this.headerWrapper)
    this.el.appendChild(this.topWrapper)
    this.el.appendChild(this.listWrapper)
  }
  
  bindEvent() {
    this.header.bindEvent()
    this.top.bindEvent()
    this.list.bindEvent(this.top)
  }
}
