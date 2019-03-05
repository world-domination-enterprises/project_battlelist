import axios from 'axios'

const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api',
  withCredentials: true
})

const errHandler = err => {
  console.error(err)
  if (err.response && err.response.data) {
    console.error("API response", err.response.data)
    throw err.response.data.message
  }
  throw err
}

export default {
  service: service,

  isLoggedIn() {
    return localStorage.getItem('user') != null
  },

  signup(userInfo) {
    return service
      .post('/signup', userInfo)
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        localStorage.setItem('user', JSON.stringify(res.data))
        return res.data
      })
      .catch(errHandler)
  },

  songSearch(searchString) {
    return service
      .post('/songsearch', searchString)
      .then(res => {
        console.log('TCL: songSearch -> res.data', res.data)
        return res.data
      })
  }, 

  login() {
    return service
      .get('login/callback')
      .then(res => {
        localStorage.setItem('user', JSON.stringify(res.data))
        res.redirect(process.env.FRONTEND_URI + '/', res.data)
      })
  },

  logout() {
    localStorage.removeItem('user')
    return service
      .get('/logout')
  },

  getSongs() {
    return service
      .get('/songsearch')
      .then(res => res.data)
      .catch(errHandler)
  },

  getProfile() {
    return service
      .get('/profile')
      .then(res => {
        localStorage.setItem('user', JSON.stringify(res.data));
        return res.data
      })
      .catch(errHandler);
  },

  updateUser(_user, _playlist) {
    console.log('api called with following data ', {_user, _playlist})

    return service
      .post('/profile/update', {_user, _playlist})
      .then(res => {
        localStorage.setItem('user', JSON.stringify(res.data));
        return res.data
      })
      .catch(errHandler);
  },

  refreshAndFetchAccessToken() {
    return service
      .get('/accesstoken')
      .then(res => {
        localStorage.setItem('accessToken', JSON.stringify(res.data));
        return res.data
      })
      .catch(errHandler);
  }, 

  getPlaylist(data) {
    return service 
      .post ('/playlist', data)
      .then(res => {
        localStorage.setItem('playlist', JSON.stringify(res.data));
        return res.data
      })  
      .catch(errHandler)
  },

  postSong(data) {
    console.log('api called with following data ', data)
    return service
      .post('/songsearch/add', data)
      .then(res => {
        return res.data})
      .catch(errHandler)
  },
  
  deleteSong(data) {
    console.log('api called with following data ', data)
    return service
      .post('/playlist/deleteItem', data)
      .then(res => {
        return res.data})
      .catch(errHandler)
  },

  addPlaylist(data) {
    console.log('api called with following data ', data)

    return service
      .post('/createplaylist/create', data)
      .then(res => {
        return res.data
      })
      .catch(errHandler)
  },
  
  fetchSongs(data) {
    return service
      .post('/fetchsongs', data)
      .then(res => res.data)
      .catch(errHandler)
  },




  // ********************************************************************************

  addPicture(file) {
    const formData = new FormData()
    formData.append("picture", file)
    return service
      .post('/endpoint/to/add/a/picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => res.data)
      .catch(errHandler)
  },
}
