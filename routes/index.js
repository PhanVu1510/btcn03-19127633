var express = require('express');
var router = express.Router();

function isNumeric(val) {
  return /^-?\d+$/.test(val);
}

/* GET home page. */
router.get('/', function (req, res, next) {
  let notification = '';
  let z;

  if(req.query.x == undefined && req.query.y == undefined)
      notification=''

  else if ((req.query.x !='' && !isNumeric(req.query.x)) || (req.query.y !='' && !isNumeric(req.query.y)))
    notification = 'Dữ liệu nhập vào không phải số thực'

  else if (req.query.x == '' || req.query.y == '')
    notification = 'Chưa điền đủ thông tin'

  else if (req.query.x != '' && req.query.y != '')
  {
    const x = parseFloat(req.query.x)
    const y = parseFloat(req.query.y)
    notification='Xong'

    if (req.query.radio=="add")
      z=x+y

    else if (req.query.radio=="minus")
      z=x-y

    else if (req.query.radio=="mul")
      z=x*y

    else if (req.query.radio=="div") {
      if (y == 0)
        notification='Số thứ 2 phải khác 0'
      else
        z=x/y
    }
    else
      notification='Chưa có phép tính nào được chọn';
  }

  if (req.query.radio=="add")
    res.render('index', {x:req.query.x, y:req.query.y , z: z , notification:notification ,add:"checked"});

  else if (req.query.radio=="minus")
    res.render('index', {x:req.query.x, y:req.query.y , z:z , notification:notification ,minus:"checked"});

  else if (req.query.radio=="mul")
    res.render('index', {x:req.query.x, y:req.query.y , z:z , notification:notification ,mul:"checked"});

  else if (req.query.radio=="div")
    res.render('index', {x:req.query.x, y:req.query.y , z:z , notification:notification ,div:"checked"});
  
  else
    res.render('index', {x:req.query.x, y:req.query.y , z:z , notification:notification});

});


module.exports = router;
