import { i18n } from '@/plugins' // 导入插件
import { createApp } from 'vue'
import ColorLevel from './colorLevel.vue'

const openModalColorLeve = (options) => {
  const app = createApp(ColorLevel, {
    title: options?.title || '默认标题',
    footer: options?.footer || false,
    visible: options?.visible || false,
    ...options,
  })
  // app.use(ArcoVue)
  app.use(i18n)
  const div = document.createElement('div')
  app.mount(div)
  document.body.appendChild(div)

  return () => {
    app.unmount()
    div.remove()
  }
}

export { openModalColorLeve }
