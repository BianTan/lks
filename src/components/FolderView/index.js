import Component from '../Component'
import { getStorage, setStorage } from '@/utils'
import { dataList } from '@/common'

export default class FolderView extends Component{
  
  constructor(options) {
    super()
    this.title = options.title
    this.container = options.container
    this.isTop = options.isTop || false
    this.data = options.data || []
  }
  
  // 渲染文件夹
  render() {
    this.container.innerHTML += Component.folderView({
      title: this.title,
      data: this.data,
      isTop: this.isTop,
      isCollect: true
    })
  }
  
  // 绑定事件
  bindEvent() {
    this.container.addEventListener('click', this.handleContainerClick.bind(this), false)
  }
  
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
    } else if (classList.includes('icon')) { // 点击删除按钮
      const index = Number(target.dataset.index)
      const id = Number(target.dataset.id)
      FolderView.removeCollect(index, id)
    }
  }
  
  // 添加收藏
  static addCollect(index, id) {
    const collectIdList = getStorage('collectIdList', { isJson: true, defaultValue: '{}' })
    const collectList = getStorage('collectList', { isJson: true, defaultValue: '[]' })
    
    const list = collectIdList[index] || []
    let tempIdList = {}, tempList = []
    
    tempIdList[index] = list.includes(id)
      ? list.filter(f => f !== id)
      : [...list, id]
  
    tempList = list.includes(id)
      ? collectList.filter(f => f.id !== id)
      : [...collectList, ...dataList[index].items.filter(f => f.id === id)]
  
    setStorage('collectIdList', { ...collectIdList, ...tempIdList })
    setStorage('collectList', tempList)
  }
  
  // 移除收藏
  static removeCollect(index, id) {
    const collectIdList = getStorage('collectIdList', { isJson: true, defaultValue: '{}' })
    const collectList = getStorage('collectList', { isJson: true, defaultValue: '[]' })
    let tempIdList = {}
    
    tempIdList[index] = collectIdList[index].filter(f => f !== id)
    const tempList = collectList.filter(f => f.id !== id)
    
    setStorage('collectIdList', { ...collectIdList, ...tempIdList })
    setStorage('collectList', tempList)
  }
  
}
