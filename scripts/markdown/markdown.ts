import Markdown from 'vite-plugin-md'
import type { IThemeRegistration } from 'shiki'
import { highlightLinePlugin } from './plugins/highlightLines'
import { highlight } from './plugins/highlight'
import MarkdownAnchor from 'markdown-it-anchor'

type ThemeOptions =
  | IThemeRegistration
  | { light: IThemeRegistration; dark: IThemeRegistration }

const markdown = async () => {
  return Markdown({
    markdownItOptions: {
      html: true,
      linkify: true,
      typographer: true,
      highlight: await highlight()
    },
    markdownItSetup(md) {
      // custom plugins
      md.use(highlightLinePlugin)

      // mdit-vue plugins
      md.use(MarkdownAnchor, {
        permalink: true,
        permalinkBefore: true,
        permalinkSymbol: ''
      })
    }
  })
}

export { type ThemeOptions, markdown }
