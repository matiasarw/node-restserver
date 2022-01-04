const {response, request} = require('express')

const usuariosGet = (req= request, res = response) => {
    const query = req.query;
    res.json({
        ok: true,
        msg: 'get API - controlador',
        query
    })
  }

const usuariosPut = (req, res) => {
    const id = req.params.id
    res.json({
        ok: true,
        msg: 'put API',
        id
    })
  }

const usuariosPost = (req, res) => {
    const body = req.body;
    res.status(201).json({
        ok: true,
        msg: 'post API',
        body
    })
  }

const usuariosDelete = (req, res) => {
    res.json({
        ok: true,
        msg: 'delete API'
    })
  }

  module.exports = {
      usuariosGet,
      usuariosPut,
      usuariosPost,
      usuariosDelete,
  }