const express = require('express')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')

const databasePath = path.join(__dirname, 'cricketTeam.db')

const app = express()

app.use(express.json())

let database = null

const initializeDbAndServer = async () => {
  try {
    database = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () =>
      console.log('Server Running at http://localhost:3000/'),
    )
  } catch (error) {
    console.log(`DB Error: ${error.message}`)
    process.exit(1)
  }
}

initializeDbAndServer()

const convertDbObjectToResponseObject = dbObject => {
  return {
    movieId: dbObject.movie_id,
    movieName: dbObject.movie_name,
    directorId: dbObject.director_id,
    leadActor: dbObject.lead_actor,
  }
}

app.get('/movies/', async (request, response) => {
  const getmovieQuery = `
    SELECT
      movie_name
    FROM
      movie;`
  const moviesArray = await database.all(getmovieQuery)
  response.send(
    moviesArray.map(eachPlayer => ({movieName: eachPlayer.movie_name})),
  )
})

app.get('/directors/', async (request, response) => {
  const getmovieQuery = `
    SELECT
      director
      _name
    FROM
      movie;`
  const moviesArray = await database.all(getmovieQuery)
  response.send(
    moviesArray.map(eachPlayer => ({movieName: eachPlayer.director_name})),
  )
})

app.get('/directors/:directorId/movies/', async (request, response) => {
  const {movieId} = request.params
  const getMovieQuery = `
    SELECT 
      * 
    FROM 
      movie 
    WHERE 
      movie_id = ${movieId};`
  const movie = await database.get(getMovieQuery)
  response.send(convertDbObjectToResponseObject(movie))
})

app.post('/movies/', async (request, response) => {
  const {directorId, movieName, leadActor} = request.body
  const postMovieQuery = `
  INSERT INTO
    movie (director_id, movie_name, lead_actor)
  VALUES
    ('${director_id}', ${movie_name}, '${lead_actor}');`
  await database.run(postMovieQuery)
  response.send('Movie Successfully Added')
})

app.put('/movies/:movieId/', async (request, response) => {
  const {directorId, movieName, leadActor} = request.body
  const {directorId} = request.params
  const updateMovieQuery = `
            UPDATE movie
            SET
              director_id = ${directorId},
              movie_name = '${movieName}',
              lead_actor = '${leadActor}'
            WHERE movie_id = ${movieId};`

  await database.run(updateMovieQuery)
  response.send('Movie Details Updated')
})

app.delete('/movies/:movieId/', async (request, response) => {
  const {directorId} = request.params
  const deleteMovieQuery = `
  DELETE FROM
    movie
  WHERE
    director_id = ${directorId};`
  await database.run(deleteMovieQuery)
  response.send('Movie Removed')
})
module.exports = app

/*const express = require('express')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')

const databasePath = path.join(__dirname, 'cricketTeam.db')

const app = express()

app.use(express.json())

let database = null

const initializeDbAndServer = async () => {
  try {
    database = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () =>
      console.log('Server Running at http://localhost:3000/'),
    )
  } catch (error) {
    console.log(`DB Error: ${error.message}`)
    process.exit(1)
  }
}

initializeDbAndServer()

const convertDbObjectToResponseObject = dbObject => {
  return {
    movieId: dbObject.movie_id,
    movieName: dbObject.movie_name,
    directorId: dbObject.director_id,
    leadActor: dbObject.lead_actor,
  }
}

app.get('/movies/', async (request, response) => {
  const getmovieQuery = `
    SELECT
      movie_name
    FROM
      movie;`
  const moviesArray = await database.all(getmovieQuery)
  response.send(
    moviesArray.map(eachPlayer => ({movieName: eachPlayer.movie_name})),
  )
})

app.get('/movies/:movieId/', async (request, response) => {
  const {movieId} = request.params
  const getMovieQuery = `
    SELECT 
      * 
    FROM 
      movie 
    WHERE 
      movie_id = ${movieId};`
  const movie = await database.get(getMovieQuery)
  response.send(convertDbObjectToResponseObject(movie))
})

app.post('/movies/', async (request, response) => {
  const {directorId, movieName, leadActor} = request.body
  const postMovieQuery = `
  INSERT INTO
    movie (director_id, movie_name, lead_actor)
  VALUES
    ('${director_id}', ${movie_name}, '${lead_actor}');`
  await database.run(postMovieQuery)
  response.send('Movie Successfully Added')
})

app.put('/movies/:movieId/', async (request, response) => {
  const {directorId, movieName, leadActor} = request.body
  const {directorId} = request.params
  const updateMovieQuery = `
            UPDATE movie
            SET
              director_id = ${directorId},
              movie_name = '${movieName}',
              lead_actor = '${leadActor}'
            WHERE movie_id = ${movieId};`

  await database.run(updateMovieQuery)
  response.send('Movie Details Updated')
})

app.delete('/movies/:movieId/', async (request, response) => {
  const {directorId} = request.params
  const deleteMovieQuery = `
  DELETE FROM
    movie
  WHERE
    director_id = ${directorId};`
  await database.run(deleteMovieQuery)
  response.send('Movie Removed')
})
module.exports = app

/*
const express = require('express')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')
const app = express()
app.use(express.json())

const databasePath = path.join(__dirname, 'cricketTeam.db')
let database = null

const initializeAndServer = async () => {
  try {
    database = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => console.log('success'))
  } catch (error) {
    console.log(`DB Error :  ${error.message}`)
    process.exit(1)
  }
}

initializeAndServer()

const convertObObjectToResponseObject = dbObject => {
  return {
    playerId: dbObject.player_Id,
    playerName: dbObject.player_name,
    jerseyNumber: dbObject.jersey_number,
    role: dbObject.role,
  }
}

app.get('/players/', async (request, response) => {
  const getPlayersQuery = `SELECT 
    *
    FROM 
    cricket_team;`
  const playersArray = await database.all(getPlayersQuery)
  response.send(
    playersArray.map(eachPlayer => convertObObjectToResponseObject(eachPlayer)),
  )
})

app.get('/players/:playerId/', async (request, response) => {
  const {playerId} = request.params
  const getPlayersQuery = `SELECT 
    *
    FROM 
    cricket_team
    WHERE
    player_Id= '${playerId}';`
  const player = await database.get(getPlayersQuery)
  response.send(convertObObjectToResponseObject(player))
})

app.post('/players/', async (request, response) => {
  const details = request.body
  const {playerName, jerseyNumber, role} = details
  const postPlayerQuery = `INSERT INTO 
        cricket_team(player_Name,jersey_number,role)
    VALUES
        '${playerName}',
            '${jerseyNumber}',
            '${role}';`
  const player = await database.run(postPlayerQuery)
  response.send('Player Added to Team')
})

app.put('/players/:playerId/', async (request, response) => {
  const {playerName, jerseyNumber, role} = request.body
  const {playerId} = request.params
  const updatePlayerQuery = `UPDATE 
      cricket_team
    SET 
    player_name = '${playerName}', 
        jersey_number = ${jerseyNumber},
        role = '${role}'
    
    WHERE
    player_Id=${playerId};`
  await database.run(updatePlayerQuery)
  response.send('Player Details Updated')
})

app.delete('/players/:playerId/', async (request, response) => {
  const {playerId} = request.params
  const deletePlayerQuery = `DELETE
    cricket_team
    WHERE
    player_Id='${playerId}';`
  await database.run(deletePlayerQuery)
  response.send('Player Removed')
})

module.exports = app*/
