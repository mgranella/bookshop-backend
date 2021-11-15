const cors = require("cors");
const server = require('express');
const app = server();
const monitor = require('morgan');

// settings
app.set('port', process.env.PORT || 3099)
app.set('json spaces', 2);

// monitor requests
app.use(monitor('dev'))
app.use(server.json());
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// routes
app.use('/api/books', require('./routes/favorite-book'));

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({error: { message: error.message }});
})

// starts the server
app.listen(app.get('port'), ()=>{
    console.log(`Server running in port ${app.get('port')}`);
})
