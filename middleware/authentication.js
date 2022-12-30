export default function ({ store, route, redirect }) {
  let path = route.path
  path.toLowerCase()
  path = path.split('/')[1]

  const excludePaths = ['signin', 'signup']

  if (store.getters.isLoggedIn) {
    if (excludePaths.includes(path)) {
      redirect('/')
    }
  } else {
    if (!excludePaths.includes(path)) {
      redirect('/signin')
    }
  }
}
