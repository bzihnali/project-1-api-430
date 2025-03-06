const hostIndex = (req, res) => {
    res.sendFile('index.html', { root: "./client/" })
};

const notFound = (req, res) => {
    res.status(404).sendFile('notFound.html', { root: "./client/" });
};

module.exports = {
    index: hostIndex,
    notFound,
};