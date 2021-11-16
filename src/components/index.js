import FolderView from './FolderView'
import ListView from './ListView'

export default class Init {
  constructor({ el, data, collectList, collectIdList }) {
    this.el = el
    this.data = data || []
    this.collectList = collectList || []
    this.collectIdList = collectIdList || {}
    this.topWrapper = document.createElement('div')
    this.topWrapper.classList.add('container')
    this.listWrapper = document.createElement('div')
    this.listWrapper.classList.add('container')
  }
  
  init() {
    this.createComponents()
    this.render()
    this.bindEvent()
  }
  
  createComponents() {
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
      closed: false,
      collectIdList: this.collectIdList
    })
  }
  
  render() {
    this.top.render()
    this.list.render()
    this.el.appendChild(this.topWrapper)
    this.el.appendChild(this.listWrapper)
  }
  
  bindEvent() {
    this.top.bindEvent()
    this.list.bindEvent()
  }
}
