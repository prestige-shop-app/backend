const express = require('express');
const router = express.Router();
const verify = require('./VerificationToken.js')
const db = require('../Database/Connection.js')

router.get('/',(req,res)=>{
    const sql='SELECT * FROM validations'
  db.query(sql,(err , result)=>{
      if(!err)
      res.send(result)
      else 
      console.log(err)
  })
})

router.get('/:id',(req,res)=>{
    const sql='SELECT * FROM validations WHERE id = ?'
    db.query(sql,[req.params.id],(err,result)=>{
      if(!err)
      res.send(result)
      else
      console.log(err)
    })
})

router.post('/:id',(req,res)=>{
    let newVal = req.body
    const sql='INSERT INTO validations (driver_id,status) VALUES (?, ?)'
    db.query(sql,[newVal.driver_id , newVal.status],(err,result)=>{
        if(!err)
        res.send("add new validation")
        else
        console.log(err)
    })
})

router.put('/:id',(req,res)=>{
    let update = req.body
    const sql='UPDATE validations SET driver_id  = ?, status = ? WHERE id = ?'
    db.query(sql,[update.driver_id ,update.status],(err,result)=>{
        if(!err)
        res.send("update specific validation")
        else
        console.log(err)
    })
})

router.delete('/',(req,res)=>{
const sql = 'DELETE FROM validations WHERE id <> 0 '
db.query(sql,(err,result)=>{
    if(!err)
    res.send('validations deleted')
    else
    console.log(err)
})
})

router.delete('/:id',(req,res)=>{
    const sql = 'DELETE FROM validations WHERE id = ? '
    db.query(sql,[req.params.id],(err,result)=>{
        if(!err)
        res.send('specific validation deleted')
        else
        console.log(err)
    })
    })

    module.exports = router;