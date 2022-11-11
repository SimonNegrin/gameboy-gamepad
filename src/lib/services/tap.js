
export function tap(element, threshold = 300) {
  let startTime
  
  const onTouchstart = () => startTime = Date.now()
  const onTouchend = () => {
    const tapTime = Date.now() - (startTime ?? 0)
    if (tapTime < threshold) {
      element.dispatchEvent(new CustomEvent('tap'))
    }
  }

  element.addEventListener('touchstart', onTouchstart)
  element.addEventListener('touchend', onTouchend)

  return {
    destroy: () => {
      element.removeEventListener('touchstart', onTouchstart)
      element.removeEventListener('touchend', onTouchend)
    },
    update: (newThreshold) => {
      threshold = newThreshold
    }
  }
}
