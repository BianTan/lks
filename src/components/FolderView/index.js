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
      // 新窗口打开链接
      window.open(url, '_blank')
    } else if (classList.includes('icon')) { // 点击删除按钮
      const id = Number(target.dataset.id)
      const header = target.dataset.header
      // 移除收藏数据
      const collectList = FolderView.removeCollect({ id })
      // 重新渲染置顶栏
      this.render(collectList)
      // 获取所有 header
      const bookmarkHeader = Array.from(document.querySelectorAll('.data-list > .bookmark-folder > .bookmark-header'))
      // 循环
      bookmarkHeader.forEach(f => {
        if (f.innerText === header) { // 如果当前 header 的标题和收藏夹一样
          // 获取当前文件夹下的所有 item
          const bookmarkLi = Array.from(f.parentNode.querySelectorAll('.bookmark-li'))
          // 找到对应的 id
          const el = bookmarkLi.filter(f => Number(f.dataset.id) === id)
          // 更新对应 id 的收藏状态图标
          if (el.length > 0) FolderView.updateItemDOM(el[0], true)
        }
      })
    }
  }
  
  // 切换收藏状态收藏
  static switchCollect({ id, header }) {
    // 读取储存的收藏列表
    const collectList = getStorage('collectList', { isJson: true, defaultValue: '[]' })
    // 转换成 id 列表
    const ids = collectList.map(m => m.id)
    // 找到对应数据
    const list = dataList.find(f => f.title === header).items || []
    // 进行删除或添加收藏的数据操作
    const tempList = ids.includes(id)
      ? collectList.filter(f => f.id !== id)
      : [...collectList, ...list.filter(f => f.id === id).map(m => {
        const { tag, ...more } = m
        return {
          tag: `${header} - ${tag}`,
          header,
          ...more
        }
      })]
    // 储存数据
    setStorage('collectList', tempList)
    
    // 返回新的收藏列表和当前是否是删除收藏
    return {
      data: tempList,
      isDelete: ids.includes(id)
    }
  }
  
  // 移除收藏
  static removeCollect({ id }) {
    // 读取储存的收藏列表
    const collectList = getStorage('collectList', { isJson: true, defaultValue: '[]' })
    // 过滤掉需要移除的收藏 ID
    const tempList = collectList.filter(f => f.id !== id)
    // 储存数据
    setStorage('collectList', tempList)
    // 返回新的收藏列表
    return tempList
  }
  
  // 修改自身DOM数据
  static updateItemDOM(el, isDelete) {
    // 不存在节点 return
    if (!el) return
    // 找到需要修改的 DOM
    const oIconTop = el.querySelector('.icon-top')
    const oIconCollect = el.querySelector('.icon-collect')
    // 判断是删除还是添加，进行图片更换
    if (isDelete) {
      oIconTop.src = collect2
      oIconCollect.src = collect
    } else {
      oIconTop.src = collected2
      oIconCollect.src = collected
    }
  }
  
}
