import Component from '../Component'
import collect from '@/assets/images/collect.svg'
import collected from '@/assets/images/collected.svg'
import collect2 from '@/assets/images/collect2.svg'
import collected2 from '@/assets/images/collected2.svg'
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
  render(data = null) {
    this.container.innerHTML = Component.folderView({
      title: this.title,
      data: data ? data : this.data,
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
      const collectList = FolderView.removeCollect(index, id)
      this.render(collectList)
      const folders = Array.from(document.querySelectorAll('.data-list > .bookmark-folder'))
      const bookmarkLi = Array.from(folders[index].querySelectorAll('.bookmark-li'))
      FolderView.updateItemDOM(bookmarkLi.filter(f => Number(f.dataset.id) === id)[0], true)
    }
  }
  
  // 切换收藏状态收藏
  static switchCollect(index, id) {
    const collectIdList = getStorage('collectIdList', { isJson: true, defaultValue: '{}' })
    const collectList = getStorage('collectList', { isJson: true, defaultValue: '[]' })
    
    const list = collectIdList[index] || []
    let tempIdList = {}, tempList = []
    
    tempIdList[index] = list.includes(id)
      ? list.filter(f => f !== id)
      : [...list, id]
  
    tempList = list.includes(id)
      ? collectList.filter(f => f.id !== id)
      : [...collectList, ...dataList[index].items.filter(f => f.id === id).map(m => {
        const { tag, ...more } = m
        return {
          tag: `${dataList[index].title} - ${tag}`,
          index,
          ...more
        }
      })]
  
    setStorage('collectIdList', { ...collectIdList, ...tempIdList })
    setStorage('collectList', tempList)
    
    return {
      data: tempList,
      isDelete: list.includes(id)
    }
  }
  
  // 移除收藏
  static removeCollect(index, id) {
    const collectIdList = getStorage('collectIdList', { isJson: true, defaultValue: '{}' })
    const collectList = getStorage('collectList', { isJson: true, defaultValue: '[]' })
    let tempIdList = {}
    console.log(index, id)
    tempIdList[index] = collectIdList[index].filter(f => f !== id)
    const tempList = collectList.filter(f => f.id !== id)
    
    setStorage('collectIdList', { ...collectIdList, ...tempIdList })
    setStorage('collectList', tempList)
    
    return tempList
  }
  
  // 修改自身DOM数据
  static updateItemDOM(el, isDelete) {
    const oIconTop = el.querySelector('.icon-top')
    const oIconCollect = el.querySelector('.icon-collect')
    if (isDelete) {
      oIconTop.src = collect2
      oIconCollect.src = collect
    } else {
      oIconTop.src = collected2
      oIconCollect.src = collected
    }
  }
  
}
