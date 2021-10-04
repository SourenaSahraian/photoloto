const express = require('express')
const mongoose = require('mongoose');
const passport = require('passport');
require('./authentication/passportConfig');
const keys = require('./config/keys');
const login = require('./routes/authentication');
const contest = require('./routes/contest');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const genericErrorHandler = require('./erros/GenericErrorHandler');
const app = express();
const port = process.env.port || 8000
// change back to 4005;

app.set('view engine', 'ejs')
app.use(bodyParser.json());
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.key],
    signed: false
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('/', login);
app.use('/contest', contest)
app.use(genericErrorHandler)

mongoose.connect(keys.mongodb.connectionUrl, (err, client) => {
    //  console.log(' client ', client)
})

app.get('/', (req, res) => {
    res.render('login');
})



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})