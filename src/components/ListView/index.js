import Component from '../Component'
import FolderView from '../FolderView'

export default class ListView extends Component{
  constructor(options) {
    super()
    this.container = options.container
    this.data = options.data || []
    this.closed = options.closed
    this.collectList = options.collectList || []
    this.topInstance = null
  }
  
  // 渲染列表
  render() {
    const collectIds = this.collectList.map(m => m.id)
    this.data.forEach(f => {
      this.container.innerHTML += Component.folderView({
        title: f.title,
        data: f.items,
        closed: this.closed,
        collectIds
      })
    })
  }
  
  // 绑定事件
  bindEvent(instance) {
    this.topInstance = instance
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
      const header = target.dataset.header
      // 更新收藏数据
      const { data: collectList, isDelete } = FolderView.switchCollect({ index, id, header })
      // 重新渲染收藏文件夹
      this.topInstance && this.topInstance.render(collectList)
      // 更新卡片收藏图标
      FolderView.updateItemDOM(target.parentNode.parentNode, isDelete)
    }
  }
}
