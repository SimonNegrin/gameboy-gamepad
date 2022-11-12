import {
  DIR_BOTTOM,
  DIR_LEFT,
  DIR_LEFT_BOTTOM,
  DIR_LEFT_TOP,
  DIR_RIGHT,
  DIR_RIGHT_BOTTOM,
  DIR_RIGHT_TOP,
  DIR_TOP
} from './geometry'

const PACKET_GAMEPAD_STATE = 3

const joystickDirections = {
  [DIR_TOP]           : 1 << 7,
  [DIR_RIGHT_TOP]     : 1 << 4 | 1 << 7,
  [DIR_RIGHT]         : 1 << 4,
  [DIR_RIGHT_BOTTOM]  : 1 << 4 | 1 << 6,
  [DIR_BOTTOM]        : 1 << 6,
  [DIR_LEFT_BOTTOM]   : 1 << 5 | 1 << 6,
  [DIR_LEFT]          : 1 << 5,
  [DIR_LEFT_TOP]      : 1 << 6 | 1 << 7,
}

const socket = new WebSocket(new URL('/gamepad/1', import.meta.env.VITE_REAL_TIME_SERVICE))

export const gamepadState = {
  joystickDir : null,
  actionA     : false,
  actionB     : false,
  start       : false,
  select      : false,
}

export const sendGamepadStatePacket = () => {
  const state = createGamepadStatusPacket()
  const packet = new Uint8Array(2)
  packet[0] = PACKET_GAMEPAD_STATE
  packet[1] = state
  socket.send(packet)
  console.log(state.toString(2).padStart(8, '0'))
}

const createGamepadStatusPacket = () => {
  // Packet [top, bottom, left, right, actA, actB, start, select]
  let packet = gamepadState.joystickDir !== null
    ? joystickDirections[gamepadState.joystickDir]
    : 0

  if (gamepadState.actionA)  packet |= 1 << 3
  if (gamepadState.actionB)  packet |= 1 << 2
  if (gamepadState.start)    packet |= 1 << 1
  if (gamepadState.select)   packet |= 1

  return packet
  
}
