import transformUrl from 'transform-url'

export default () => {
  // 参考：https://static.fanfou.com/js/bm_img_share.js

  const menuIds = []
  const menuItems = [ {
    title: '分享到饭否',
    contexts: [ 'page', 'selection' ],
    onclick(info, tab) {
      const url = transformUrl('https://fanfou.com/sharer', {
        u: tab.url,
        t: tab.title,
        d: info.selectionText || '',
      })

      createSharerPopup(url, 440)
    },
  // TODO: 拿不到链接标题
  // }, {
  //   title: '分享链接到饭否',
  //   contexts: [ 'link' ],
  //   onclick(info) {
  //     const url = transformUrl('https://fanfou.com/sharer', {
  //       u: info.linkUrl,
  //       t: info.linkTitle,
  //     })
  //
  //     createSharerPopup(url)
  //   },
  }, {
    title: '分享图片到饭否',
    contexts: [ 'image' ],
    onclick(info, tab) {
      const url = transformUrl('https://fanfou.com/sharer/image', {
        u: tab.url,
        t: tab.title,
        img_src: info.srcUrl, // eslint-disable-line camelcase
      })

      createSharerPopup(url, 540)
    },
  } ]

  function createSharerPopup(url, height) {
    window.open(url, 'sharer', `toolbar=0,status=0,resizable=0,width=640,height=${height}`)
  }

  function registerMenuItems() {
    for (const menuItem of menuItems) {
      menuIds.push(chrome.contextMenus.create(menuItem))
    }
  }

  function unregisterMenuItems() {
    menuIds.forEach(menuId => chrome.contextMenus.remove(menuId))
    menuIds.length = 0
  }

  return {
    onLoad() {
      registerMenuItems()
    },

    onUnload() {
      unregisterMenuItems()
    },
  }
}
