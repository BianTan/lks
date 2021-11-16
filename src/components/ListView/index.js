import Component from '../Component'
import FolderView from '../FolderView'

export default class ListView extends Component{
  
  constructor(options) {
    super()
    this.container = options.container
    this.data = options.data || []
    this.closed = options.closed
    this.collectIdList = options.collectIdList || {}
  }
  
  // 渲染列表
  render() {
    this.data.forEach((f, index) => {
      const collectIds = this.collectIdList[index] || []
      this.container.innerHTML += Component.folderView({
        title: f.title,
        data: f.items,
        closed: this.closed,
        index,
        collectIds
      })
    })
  }
  
  // 绑定事件
  bindEvent() {
    this.container.addEventListener('click', this.handleContainerClick.bind(this), false)
  }
  
  // 点击事件
  handleContainerClick(e) {
    const target = e.target
    // 获取 class 列表
    const classList = Array.from(target.classList)
    if (classList.includes('bookmark-header')) {  // 点击的是 header
      target.querySelector('span').classList.toggle('btn-collapse--act')
      const oUl = target.parentNode.querySelector('ul')
      oUl.style.display = oUl.style.display === 'none' ? 'flex' : 'none'
    } else if (classList.includes('bookmark-item')) { // 点击的是 Item 卡片
      const url = target.dataset.url
      window.open(url, '_blank')
    } else if (classList.includes('icon')) { // 点击收藏按钮
      const index = Number(target.dataset.index)
      const id = Number(target.dataset.id)
      FolderView.addCollect(index, id)
    }
  }
  
}
