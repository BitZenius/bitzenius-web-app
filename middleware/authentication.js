export default function ({ store, route, redirect }) {
  let path = route.path
  path.toLowerCase()
  path = path.split('/')[1]

  const excludePaths = ['revamp', 'signin', 'signup', 'auth-action', 'forgot-password']

  if (store.getters.isLoggedIn) {
    if (excludePaths.includes(path)) {
      if (path != 'auth-action') {
        redirect('/')
      }
    }
  } else {
    if (!excludePaths.includes(path)) {
      redirect('/signin')
    }
  }
}
