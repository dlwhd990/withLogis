const express = require('express')
const ExportProcess = require("../models/ExportProcess")
const Organization = require("../models/organization")
const Policy = require("../models/policy")
const router = express.Router()

router.get('/exportProcess', (req,res) => {
    ExportProcess.find({},(err,data) => {
        console.log(data)
        res.send(data) 
    })
})

router.get('/organization', (req,res) => {
    Organization.find({},(err,data) => {
        console.log(data)
        res.send(data) 
    })
})

router.get('/policy', (req,res) => {
    Policy.find({},(err,data) => {
        console.log(data)
        res.send(data) 
    })
})

module.exports = router