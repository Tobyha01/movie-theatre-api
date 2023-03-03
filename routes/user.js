const {db} = require("../db")
const {check, validationResult} = require("express-validator")
const express = require("express")
const router = express.Router()
const {User, Show} = require("../models/index")

router.use(express.json())

router.get("/", async function(request, response) {
    try{
        
        response.status(200).send(await User.findAll())
    }
    catch(error){
        response.status(500).send({error: error.message})
    }
})

router.get("/:id", async function(request, response) {
    try{
        const user = await User.findByPk(request.params.id)
        response.status(200).send({user})
    }
    catch(error){
        response.status(500).send({error: error.message})
    }
})

router.get("/:id/shows", async function(request, response) {
    try{
        const user = await User.findByPk(request.params.id)
        const userShows = await user.getShows()
        response.status(200).send(userShows)
    }
    catch(error){
        response.status(500).send({error: error.message})
    }
})

router.put("/:id/shows/:showid", async function(request, response) {
    try{
        const user = await User.findByPk(request.params.id)
        const show = await Show.findByPk(request.params.showid)
        await user.addShows(show)
        await show.update({userId: request.params.id})   
        response.status(200).send(show)
    }
    catch(error){
        response.status(500).send({error: error.message})
    }
})

module.exports = router