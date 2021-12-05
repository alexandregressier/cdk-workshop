const Eliza = require("eliza-as-promised")
const { STATUS_CODES } = require("http")

exports.hello_world = async (event) => {
    const eliza = new Eliza()
    const response = await eliza.getResponse(event.path.substring(1))
    return {
        statusCode: STATUS_CODES.SUCCESS,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "You": decodeURI(event.path.substring(1)),
            "ELIZA": decodeURI(response.reply),
        }),
    }
}