export default class GlobalListener {
  constructor() {
    this.init()
  }
  init() {
    document.body.addEventListener('click', () => {
      // 点击外边关闭 mode 切换列表
      document.querySelector('.form-item').classList.remove('mode--open')
    })
  }
}
