const Constants = require('../Constants.js')
const { createCanvas, loadImage } = require("canvas")

class Icon {
    static async render (background, icon, transparent = false) {
        const HEIGHT = 1024
        const WIDTH = 1024

        const [BACKGROUND, ICON] = await Promise.all([
            loadImage(background),
            loadImage(transparent ? Constants.THE_PUNISHER_TRANSPARENT : icon)
        ])

        const ICON_X = transparent ? 0 : 830
        const ICON_Y = 0

        const ICON_SIZE_X = transparent ? HEIGHT : 200
        const ICON_SIZE_Y = transparent ? WIDTH : 200

        const canvas = new createCanvas(HEIGHT, WIDTH)
        const ctx = canvas.getContext('2d')

        ctx.drawImage(BACKGROUND, 0, 0, HEIGHT, WIDTH) 
        ctx.save()
        ctx.globalAlpha = 0.5
        ctx.drawImage(ICON, ICON_X, ICON_Y, ICON_SIZE_X, ICON_SIZE_Y)

        return canvas.toBuffer()
    }
}

module.exports = Icon