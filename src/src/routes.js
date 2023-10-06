async function Routes(app, root) {
  app.get('/', (req, res) => {
    res.send('slpy.one API')
  })
}

module.exports = Routes
