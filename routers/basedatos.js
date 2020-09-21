const { Pool } = require('pg');
const Router = require('express-promise-router');

const pool = new Pool({
  user: 'dtyfnedpuqtglt',
  host: 'ec2-52-7-15-198.compute-1.amazonaws.com',
  database: 'd2jlrr8mbnhl11',
  password: '31ba2b80d1617b5429d2a24759154b5dc7ca198bdef49711001d08bc74c801d5',
  port: 5432,
  connecionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const router = new Router();
// export our router to be mounted by the parent application
module.exports = router;

router.get('/consultatotalpacientes', async (req, res) => {
  //const { id } = req.params
  const { rows } = await pool.query('SELECT * FROM pacientes');
  res.send(rows);
});

router.post('/insertarpacientes', async (req, res) => {
  const { nombre, apellido, numid } = req.body;
  await pool.query
  (
    `INSERT INTO pacientes(nombre, apellido, numid) VALUES('${nombre}','${apellido}','${numid}')`
  );
  res.send('Datos insertados');
});

router.delete('/eliminarpacientes', async (req,res) =>{
  const {numid} = req.body;
  await pool.query
  (
    `DELETE FROM pacientes WHERE numid = '${numid}'`
  );
  res.send('Datos eliminados');
});

router.put('/actualizarpacientes', async (req,res) =>{
  const {numid, nombre, apellido} = req.body;

  await pool.query
  (
    `UPDATE pacientes
    SET nombre = '${nombre}',
        apellido =  '${apellido}'
    WHERE numid = '${numid}'`
  );

  res.send('Datos actualizados');
});

