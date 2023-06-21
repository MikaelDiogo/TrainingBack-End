
const router = require('express').Router()

const { exists } = require('../models/Person')
const Person = require('../models/Person')


router.post('/', async (req,res) => {
    //req.body onde chegarão os dados
    const {name, salary, approved} = req.body
    if(!name){
    res.status(422).json({error: 'name is mandatory'})}
    const person ={
        name, salary, approved
    }

    try{
        const Message = 'people insert'
        await Person.create(person)
        res.status(201).json(Message)
    } catch(error) {
        res.status(500).json({error: error})

    }

})

router.get('/', async (req, res)=> {
    try{
            const people = await Person.find()
            res.status(200).json(people)
    } catch{
        res.status(500).json({error:error})

    }
})

router.get('/:id', async (req, res) =>{
    const id = req.params.id

    try{
        const person = await Person.findOne({_id: id})
        if(!person){
            res.status(422).json({message: "This person not exists"})
        }

        res.status(200).json(person)

    } catch (error){
            res.status(500).json({error:error})
    }
})

//PUT, PATCH(UPDATE)

router.patch('/:id', async(req,res)=>{
        const id = req.params.id

        const {name,salary,approved} = req.body

        const person = {
            name, salary, approved
        }

        try{
            const updatePerson = await Person.updateOne({_id:id}, person)

            res.status(200).json(person)
        } catch (error) {
                res.status(500).json({error: error})
        }

})


router.delete('/id:', async(req,res)=>{
        const id = req.params.id
        
        const person = await Person.findOne({_id:id})

        if(!person){
            res.status(422).json({message: 'Person not found'})
            return
        }
        try{
            await Person.deleteOne({_id:id})
            res.status(200).json({message: 'person removed'})

        } catch (error){
            res.status(500).json({error:error})
        }
        
})


module.exports = router