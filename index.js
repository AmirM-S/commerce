const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const db = require('./app/models');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


db.sequelize.sync()
    .then(() => console.log('Synced db.'))
    .catch((err) => console.log('Failed to sync db: ' + err.message))

require('./app/routes/user.route')(app);
require('./app/routes/product.route')(app);
app.get('/', (req, res) => {
    res.json({ message: 'e-commerce'});
})


app.listen(port, () => console.log(`running on port ${port}`));