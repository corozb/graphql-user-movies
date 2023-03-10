import React, { useState } from 'react'
import { useQuery, useLazyQuery, gql, useMutation } from '@apollo/client'

const QUERY_ALL_USERS = gql`
  query GetAllUser {
    users {
      id
      name
      username
      nationality
      age
      friends {
        name
      }
    }
  }
`
const QUERY_ALL_MOVIES = gql`
  query GetAllMovies {
    movies {
      id
      name
      yearOfPublication
      IsInTheaters
    }
  }
`

const QUERY_MOVIE_BY_NAME = gql`
  query GetMovie($movieName: String!) {
    movie(name: $movieName) {
      id
      name
      yearOfPublication
    }
  }
`

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      age
      nationality
    }
  }
`

const DisplayData = () => {
  const [movieSearched, setMovieSearched] = useState('')
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [age, setAge] = useState(0)
  const [nationality, setNationality] = useState('')

  const { data, loading, refetch } = useQuery(QUERY_ALL_USERS)
  const { data: movieData } = useQuery(QUERY_ALL_MOVIES)
  const [fetchMovie, { data: movieSearchedData, error: movieError }] = useLazyQuery(QUERY_MOVIE_BY_NAME)
  const [createUser] = useMutation(CREATE_USER_MUTATION)

  if (loading) {
    return <h1>Data is loading...</h1>
  }

  if (movieError) {
    console.log(movieError)
  }

  return (
    <>
      <div>
        <input type='text' placeholder='Name...' onChange={(e) => setName(e.target.value)} />
        <input type='text' placeholder='Username...' onChange={(e) => setUsername(e.target.value)} />
        <input type='number' placeholder='Age...' onChange={(e) => setAge(+e.target.value)} />
        <input
          type='text'
          placeholder='Nationality...'
          onChange={(e) => setNationality(e.target.value.toUpperCase())}
        />
        <button
          onClick={() => {
            createUser({
              variables: {
                input: { name, username, age, nationality },
              },
            })
            refetch()
          }}
        >
          Create User
        </button>
      </div>
      <h1>Users</h1>
      {data &&
        data.users.map((user) => {
          return (
            <div key={user.id}>
              <h2>Name: {user.name}</h2>
              <h2>Username: {user.username}</h2>
              <h2>Age: {user.age}</h2>
              <h2>Nationality: {user.nationality}</h2>
            </div>
          )
        })}
      <div>
        <h1>Movies</h1>
        {movieData && movieData.movies.map((movie) => <h2>Movie Name: {movie.name}</h2>)}
      </div>

      <div>
        <input type='text' placeholder='Interstellar...' onChange={(e) => setMovieSearched(e.target.value)} />
        <button
          onClick={() =>
            fetchMovie({
              variables: {
                movieName: movieSearched,
              },
            })
          }
        >
          Fetch Data
        </button>

        {movieSearchedData && (
          <div>
            <h1>Movie Name: {movieSearchedData?.movie?.name}</h1>
            <h2>Year of Publication: {movieSearchedData?.movie.yearOfPublication}</h2>
          </div>
        )}
        {movieError && <h1>Theres was an error in the request</h1>}
      </div>
    </>
  )
}

export default DisplayData
