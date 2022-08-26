var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
const { json, raw } = require('express');

var fileData = fs.readFileSync("./datafile.json", { encoding: 'utf-8' });

var app = express();
app.use(bodyParser.json());

app.post('/user', (req, res) => {
    const reqbody = req.body;
    let rawdata = fs.readFileSync('datafile.json');
    for (let b = 0; b < rawdata.length; b++) {
        if (rawdata[b].id == reqbody.id) {
            res.send("This id data already exists...")
        }
        fs.appendFile("datafile.json", JSON.stringify(reqbody), function (err) {
            if (err) throw err;
            console.log('IS WRITTEN')
        });

        res.send("Data written successfully...")
    }

});


app.get("/allusers", (err, res) => {
    let rawdata = fs.readFileSync('datafile.json');
    let datafile = JSON.parse(rawdata);
    console.log(datafile);
    res.send(datafile);
});


app.get('/user/:id', (req, res) => {
    console.log(req.params, "hello my param!")
    const userId = req.params.id;
    console.log(userId, "hello id");
    let rawdata = fs.readFileSync('datafile.json');
    let datafile = JSON.parse(rawdata);
    console.log(datafile.length);

    let userData = []
    for (let i = 0; i < datafile.length; i++) {
        console.log(datafile[i], "i hai\n\n");
        if (datafile[i].id == userId) {
            console.log(datafile[i], "data i loguser data333...\n");
            userData.push(datafile[i])
        }
    }
    console.log(userData, "userData list");
    if (userData.length > 0) {
        res.send(userData)
    } else {
        res.send(
            {
                "error": "Not found",
                "code": 404,
            }
        )
    }
})


app.put('/user/:id', (req, res) => {
    let rawdata = fs.readFileSync('datafile.json');
    let rawdataparse = JSON.parse(rawdata);
    var userid = req.params.id;
    var reqbody = req.body;
    for (let b = 0; b < rawdataparse.length; b++) {
        if (rawdataparse[b].id == parseInt(userid)) {
            console.log("Hi Abhishek Mehra");
            objIndex = rawdataparse.findIndex((obj => obj.id == userid));
            console.log(objIndex);
            console.log("Before update: ", rawdataparse[objIndex])
            rawdataparse[objIndex]= reqbody
            console.log(rawdataparse);

        }
        fs.writeFileSync("./datafile.json", JSON.stringify(rawdataparse), {
            encoding: 'utf8',
            flag: 'w'
        })

    }
    res.send({
        "message": `Id ${userid} data updated successfully`,
        "statusCode": 200
    })

})


app.delete('/userdelete/:id', (req, res) => {
    let rawdata = fs.readFileSync('datafile.json');
    let rawdataparse = JSON.parse(rawdata);
    var userid = req.params.id;
    console.log(typeof userid, userid, "param id\n\n")
    console.log("hello world111..")
    for (var b = 0; b < rawdataparse.length; b++) {
        if (rawdataparse[b].id == parseInt(userid)) {
            rawdataparse.splice(b, 1)
            console.log(rawdataparse, b, "index Id deleted");

        }
        fs.writeFileSync("./datafile.json", JSON.stringify(rawdataparse), {
            encoding: 'utf8',
            flag: 'w'
        })
    }
    res.send({
        "message": `Id ${userid} data deleted successfully`,
        "statusCode": 200
    })
});

app.listen(3000, () => {
    console.log('Server is running perfectly.');
});