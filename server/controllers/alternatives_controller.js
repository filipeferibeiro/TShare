const connection = require('../database/connection')

exports.get = async (req, res) => {
    
    const alternativeId = req.params.id
    try {
        const items = await connection('alternatives').where({id: alternativeId}).select('*')
        return res.status(200).json(items)
    } catch (error) {
        console.log(error)
        return res.status(500).send({error: "server error"})
    }
   
}


exports.post = async (req, res) => {
    const alternatives = req.body
    console.log(alternatives)

    try {

        for (let index = 0; index < alternatives.length; index++) {
            const element = alternatives[index];
            console.log(element)
            
            await connection('alternatives').insert(element).then()
        }
        
        res.status(201).send({message: "alternatives created"})
    }
    catch (error){
        console.log(error)
        return res.status(500).send({error: "server error"})
    }
    
}

exports.put = async (req, res) => {
    const updatedAlternative = req.body
    const alternativeId = req.params.id
    try {
        await connection('alternatives').where({id: alternativeId}).update(updatedAlternative)
        return res.status(200).send({message: "Alternative updated"})    
    } catch (error) {
        return res.status(500).send({error_msg: `${error}`})
    }
    

}

exports.delete = async (req, res) => {
    const id = req.params.id
    try {
        await connection('alternatives').where({id: id}).del()
        return res.status(200).send({message: "Alternative deleted"})
    } catch (error) {
        console.log(error)
        return res.status(500).send({error: "server error"})
    }

}