import del from '@/assets/images/del.svg'
import collect from '@/assets/images/collect.svg'
import collected from '@/assets/images/collected.svg'
import collect2 from '@/assets/images/collect2.svg'
import collected2 from '@/assets/images/collected2.svg'
import empty from '@/assets/images/empty.svg'

export default class Component {
  
  static folderView ({ title = '', data, isTop = false, closed = false, isCollect = false, collectIds = [] } = {}) {
    return `
      <div class="bookmark-folder">
        <div class="bookmark-header">
          <span class="btn-collapse unclick${closed ? ' btn-collapse--act' : ''}"></span>
          <h3 class="bookmark-title unclick">${title}</h3>
        </div>
        <ul class="bookmark-ul" ${closed ? 'style="display: none;"' : ''}>
        ${
        data.length
          ? data.map(m => {
            const id = m.id
            return Component.folderItemView(m, { isTop, id, isCollect: isCollect || collectIds && collectIds.includes(id), header: title })
          })
          : `
            <li class="no-data">
              <img src="${empty}" alt="empty" class="empty">
              <p class="tip">没有数据哦，铁子！</p>
            </li>
          `
      }
        </ul>
      </div>
    `.split(',').join('')
  }
  
  static folderItemView (data, { isTop = false, id = 0, isCollect = false, header = '' }) {
    const { title, url, desc, tag, header: dataHeader } = data
    
    return `
      <li class="bookmark-li" data-id="${id}">
        <div class="bookmark-item" data-url="${url}">
          <div class="bookmark-item-bg unclick"></div>
          <img
            class="icon-top unclick"
            src="${isTop ? collected2 : isCollect ? collected2 : collect2}"
            alt=""
          >
          <div class="bookmark-item-title unclick">
            <img src="https://www.google.com/s2/favicons?domain=${url}" class="icon" alt="">
            <p class="ellipsis">${title}</p>
          </div>
          <p class="bookmark-item-desc ellipsis unclick">
            ${desc}
          </p>
          <div class="bookmark-info">
            <p class="tag">${tag}</p>
            <img
              class="icon click ${isTop ? 'del-icon' : 'icon-collect'}"
              data-id="${id}"
              data-header="${isTop ? dataHeader : header}"
              src="${isTop ? del : isCollect ? collected : collect}"
              alt=""
            >
          </div>
        </div>
      </li>
    `
  }
}
