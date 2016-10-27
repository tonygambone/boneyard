const
    express = require('express'),
    app = express();

app.use(express.static('public'));

app.use('/bootstrap', express.static('node_modules/bootstrap/dist'))

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
