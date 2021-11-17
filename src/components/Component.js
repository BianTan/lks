import del from '@/assets/images/del.svg'
import collect from '@/assets/images/collect.svg'
import collected from '@/assets/images/collected.svg'
import collect2 from '@/assets/images/collect2.svg'
import collected2 from '@/assets/images/collected2.svg'
import empty from '@/assets/images/empty.svg'

export default class Component {
  
  // 文件夹
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
  
  // 文件夹卡片
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
  
  // 首页顶部
  static appHeaderView () {
    return `
      <div class="app-header">
        <div class="header-top">
          <div class="form-item">
            <svg class="icon-auto" data-value="auto" width="18px" height="23px" viewBox="0 0 18 23" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(0.000000, -0.500000)" fill="#FFFFFF" fill-rule="nonzero">
                <path d="M9.33332422,5.74245845 L9.33332422,8.88793844 L14,4.69395693 L9.33332422,0.5 L9.33332422,3.64547999 C4.17664844,3.64547999 0,7.39906972 0,12.0334184 C0,13.6795611 0.536648438,15.2103532 1.44664844,16.5 L3.15,14.9692079 C2.625,14.0989421 2.33332422,13.0819199 2.33332422,12.0334184 C2.33332422,8.56289731 5.47164844,5.74245845 9.33332422,5.74245845 M16.5533516,7.5 L14.85,9.03079207 C15.3633516,9.91152646 15.6666758,10.9180801 15.6666758,11.9665816 C15.6666758,15.4371027 12.5283516,18.2575415 8.66667578,18.2575415 L8.66667578,15.1120616 L4,19.3060431 L8.66667578,23.5 L8.66667578,20.35452 C13.8233516,20.35452 18,16.6009303 18,11.9665816 C18,10.3204389 17.4633516,8.78964679 16.5533516,7.5 L16.5533516,7.5 Z"></path>
              </g>
            </svg>
            <svg class="icon-light" data-value="light" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13385" width="24" height="24">
              <path d="M62 512C62 263.4718625 263.97756758 62 512 62 760.5281375 62 962 263.97756758 962 512 962 760.5281375 760.02243242 962 512 962 263.4718625 962 62 760.02243242 62 512Z" p-id="13386"></path>
            </svg>
            <svg class="icon-dark" data-value="dark" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6097" width="24" height="24">
              <path d="M532 121.056c-61.12 48.352-100 122.944-100 206.944 0 145.792 118.208 264 264 264 83.904 0 158.656-39.136 207.008-100.16 0 0 8.8-11.84 24.992-11.84 17.664 0 32 14.336 32 32-0.128 247.552-200.672 448-448 448-247.424 0-448-200.576-448-448s200.576-448 448-448c17.696 0.032 32 14.336 32 32 0 16.736-12 25.056-12 25.056z" p-id="6098"></path>
            </svg>
          </div>
        </div>
      </div>
    `
  }
}
