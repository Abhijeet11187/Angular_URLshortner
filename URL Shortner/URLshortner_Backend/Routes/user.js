
const express = require('express');
const mongoose = require("mongoose");
const router = express.Router();
const multer = require("multer");
const User = require("../Models/user");
const URL = require("../Models/url");
const URLshorten = require("../Models/url");
const shortUrl = require('node-url-shortener');


const upload = multer();

router.get('/:userName', async (req, res, next) => {
    userName = req.params.userName;
    await User.findOne({ userName: userName }).populate("urlData").then((result) => {
        try {
            console.log(res);
            res.status(200).json({ message: result })
        }
        catch (e) {
            console.log(e);
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ err: err })
    })
})

//Login User

router.post('/login/:userName', upload.single(), (req, res, next) => {
    console.log(" in the user Login");
    let userName = req.params.userName;
    let password = req.body.password;
    User.findOne({ userName: userName })
        .exec()
        .then((result) => {
            if (result === null) {
                console.log("dfsdf")
                res.status(200).json({
                    message: "Not Found"
                })
            }
            else {
                if (password === result.password) {
                    res.status(200).json({
                        message: result
                    })
                }
                else {
                    res.status(200).json({
                        message: "Not Found"
                    })
                }
            }
        })
        .catch((err) => {
            res.status(400).json({
                error: err
            })
        })

})


// Regsiter User

router.post('/register', upload.single(), (req, res, next) => {
    console.log("in the register user");
    const userData = new User({
        userName: req.body.userName,
        password: req.body.password
    });
    User.findOne({ userName: req.body.userName })
        .exec()
        .then((result) => {
            if (result === null) {
                userData.save().then((result) => {
                    res.status(200).json({ message: result });
                })
                    .catch(
                        (err) => {
                            console.log(err);
                            res.status(404).json({ err: err });
                        }
                    )
            }
            else {
                res.status(400).json({
                    message: "User Already Registered"
                })
            }
        })
        .catch((err) => {
            res.status(400).json({
                error: err
            })
        })
})

//URL SHORTEN

router.post('/saveURl/:userName', upload.single(), async (req, res, next) => {
    let userName = req.params.userName;
    console.log("In the shorten URl");
    let shortedURL;
    let urlSaved;
    NotalreadyExists = false;

    await URLshorten.findOne({ original: req.body.originalURL })
        .exec()
        .then((result) => {
            console.log("In the result of find")
            console.log(result)
            if (result === null) {
                NotalreadyExists = true;
            }
            else {
                userName == "***" ? ""
                    : res.status(400).json({
                        message: "User Already Registered"
                    });

            }
        })
        .catch((err) => {
            res.status(400).json({
                error: err
            })
        })



    if (NotalreadyExists || userName=="***") {
        console.log("In the if statement");
        await shortUrl.short(req.body.originalURL, async function (err, url) {
            shortedURL = url;
            userName == "***" ? res.status(201).json({
                shortenURL: url
            }) : "";
            let URLdata = await new URL({
                original: req.body.originalURL,
                shorten: shortedURL
            });
         if(userName=='***'){}else{
            urlSaved = await URLdata.save();
            await User.updateOne({ userName: userName }, { $push: { urlData: (urlSaved._id) } }).then((result) => {
                res.status(201).json({ result })
            }, (err) => {
                console.log(err);
            }).catch((err => {
                console.log(err);
            }))
         }
            console.log("URL is Formed")
        });
    }

    console.log("SAved")



});




module.exports = router;