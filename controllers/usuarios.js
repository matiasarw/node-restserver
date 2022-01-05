const {response, request} = require('express')
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario');

const usuariosGet = async(req= request, res = response) => {

  const {limite = 5, desde=0} = req.query;
  // const usuarios = await Usuario.find({estado:true})  //si no ponemos nada entre llaves te devuelve todos los objetos
  //                       .skip(Number(desde))
  //                       .limit(Number(limite))
  // const total = await Usuario.countDocuments({estado:true}) //si no ponemos nada entre llaves te devuelve todos los objetos
  const [total, usuarios] = await Promise.all([
    Usuario.count({estado:true}),
    Usuario.find({estado:true}).skip(Number(desde)).limit(Number(limite))
  ])
  res.json({
    total,
    usuarios
      // ok: true,
      // msg: 'get API - controlador',
      // query
    })
  }

const usuariosPut = async(req, res) => {
    const id = req.params.id
    const {_id, password,google, correo, ...resto} = req.body;
    //TODO Validar contra BD
    if(password){
      const salt = bcryptjs.genSaltSync();
      resto.password = bcryptjs.hashSync(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto, {new:true})
    res.json({
        usuario
    })
  }

const usuariosPost = async(req, res = response) => {

    console.log('entro!')
    const {nombre,correo,password,rol} = req.body;
    const usuario = new Usuario({nombre,correo,password,rol})
    //verificar si existe correo
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt)

    console.log(usuario)
    await usuario.save()
    res.json({
        name:'hola'
    })
  }

const usuariosDelete = async(req, res) => {
  const id = req.params.id
  //Fisicamente lo borramos
  const usuario = await Usuario.findByIdAndDelete(id)
  // const usuario = await Usuario.findByIdAndUpdate(id, {estado:false}, {new:true})
  res.json({
      usuario
  })
}

  module.exports = {
      usuariosGet,
      usuariosPut,
      usuariosPost,
      usuariosDelete,
  }