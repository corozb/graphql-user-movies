const { UserList, MovieList } = require('../FakeData')
const _ = require('lodash')

const resolvers = {
  Query: {
    users: (parent, args, context, info) => {
      // console.log(parent)

      if (UserList) return { users: UserList }

      return { message: 'Yo, there was an error' }
    },
    user: (parent, args) => {
      const id = args.id
      const user = _.find(UserList, { id: Number(id) })
      return user
    },

    movies: () => {
      return MovieList
    },
    movie: (parent, args) => {
      const name = args.name
      const movie = _.find(MovieList, { name })
      return movie
    },
  },

  User: {
    favoriteMovies: () => {
      return _.filter(MovieList, (movie) => movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010)
    },
  },

  Mutation: {
    createUser: (parent, args) => {
      const user = args.input
      const lastId = UserList[UserList.length - 1].id
      user.id = lastId + 1
      UserList.push(user)
      return user
    },

    updateUsername: (parent, args) => {
      const { id, newUsername } = args.input
      let userUpdated
      UserList.forEach((user) => {
        if (user.id === Number(id)) {
          user.username = newUsername
          userUpdated = user
        }
      })

      return userUpdated
    },

    deleteUser: (parent, args) => {
      const { id } = args
      _.remove(UserList, (user) => user.id === Number(id))
      return null
    },
  },

  UsersResult: {
    __resolveType(obj) {
      if (obj.users) {
        return 'UserSuccessfulResponse'
      }

      if (obj.message) {
        return 'UserErrorResponse'
      }

      return null
    },
  },
}

module.exports = { resolvers }
