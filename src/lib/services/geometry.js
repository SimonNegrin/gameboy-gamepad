
export const DIR_TOP           = 0
export const DIR_RIGHT_TOP     = 1
export const DIR_RIGHT         = 2
export const DIR_RIGHT_BOTTOM  = 3
export const DIR_BOTTOM        = 4
export const DIR_LEFT_BOTTOM   = 5
export const DIR_LEFT          = 6
export const DIR_LEFT_TOP      = 7

export const calcDistance = (from, to) => {
  const x = to[0] - from[0]
  const y = to[1] - from[1]
  return Math.sqrt(x * x + y * y)
}

export const getVectorDir = ([x, y]) => {
  const angle = Math.atan2(y, x) / Math.PI * 180
  const abs = Math.abs(angle)
  
  if (abs < 22.5) {
    return DIR_RIGHT
  }
  
  if (abs < 67.5) {
    return angle > 0
      ? DIR_RIGHT_BOTTOM
      : DIR_RIGHT_TOP
  }
  
  if (abs < 112.5) {
    return angle > 0
      ? DIR_BOTTOM
      : DIR_TOP
  }
  
  if (abs < 157.5) {
    return angle > 0
      ? DIR_LEFT_BOTTOM
      : DIR_LEFT_TOP
  }
  
  return DIR_LEFT
}
