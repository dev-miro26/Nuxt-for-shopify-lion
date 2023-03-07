import { colors } from './colors'
import { generateColorList } from './helpers'

export const blackAndWhite = generateColorList([colors.white, colors.black])

export const grayscale = generateColorList([
  colors.dimGray,
  colors.mortar,
  colors.nightRider,
  colors.black
])

export const pastels = generateColorList([
  colors.lightCyan,
  colors.cottonCandy,
  colors.paleLavender,
  colors.aquamarine,
  colors.electricBlue,
  colors.greenYellow,
  colors.blush,
  colors.papayaWhip,
  colors.lavender,
  colors.peach,
  colors.monaLisa,
  colors.magenta
])

export const primaryAccent = generateColorList([colors.flamingo])
