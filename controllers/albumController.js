exports.find = async (req, res) => {
    try {
        let data = "lista"
        res.send({ ok: true, error: null, data: data });
    } catch (error) {
        res.send({ ok: false, error: error, data: null });
    }
}