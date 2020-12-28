const express = require('express');
const router = express.Router();
const verify = require('./VerificationToken.js')
const db = require('../Database/Connection.js')

router.get('/',(req,res)=>{
    const sql='SELECT * FROM requests'
  db.query(sql,(err , result)=>{
      if(!err)
      res.send(result)
      else 
      console.log(err)
  })
})

router.get('/:id',(req,res)=>{
    const sql='SELECT * FROM requests WHERE id = ?'
    db.query(sql,[req.params.id],(err,result)=>{
      if(!err)
      res.send(result)
      else
      console.log(err)
    })
})

router.post('/',(req,res)=>{
    let newReq = req.body
    const sql='INSERT INTO requests (request,init_position,final_position) VALUES (?, ?, ?)'
    db.query(sql,[newReq.request,newReq.init_position,newReq.final_position],(err,result)=>{
        if(!err)
        res.send("add new request")
        else
        console.log(err)
    })
})

router.put('/:id',(req,res)=>{
    let update = req.body
    const sql='UPDATE requests SET request = ?, init_position = ?, final_position = ? WHERE id = ?'
    db.query(sql,[update.request,update.init_position,update.final_position],(err,result)=>{
        if(!err)
        res.send("update specific request")
        else
        console.log(err)
    })
})

router.delete('/',(req,res)=>{
const sql = 'DELETE FROM requests WHERE id <> 0 '
db.query(sql,(err,result)=>{
    if(!err)
    res.send('request deleted')
    else
    console.log(err)
})
})

router.delete('/:id',(req,res)=>{
    const sql = 'DELETE FROM requests WHERE id = ? '
    db.query(sql,[req.params.id],(err,result)=>{
        if(!err)
        res.send('specific request deleted')
        else
        console.log(err)
    })
    })

    module.exports = router;