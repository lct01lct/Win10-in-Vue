export const scrollToBottom = (domWrapper: HTMLElement, isSmoothly = false) => {
  (function smoothscroll() {
    const currentScroll = domWrapper.scrollTop; // 已经被卷掉的高度
    const clientHeight = domWrapper.offsetHeight; // 容器高度
    const scrollHeight = domWrapper.scrollHeight; // 内容总高度
    if (scrollHeight - 10 > currentScroll + clientHeight) {
      domWrapper[isSmoothly ? 'scroll' : 'scrollTo'](
        0,
        currentScroll + (scrollHeight - currentScroll - clientHeight) / 2
      );
    }
  })();
};
