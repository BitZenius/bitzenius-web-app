export default ({ app }, inject) => {
    // Inject $hello(msg) in Vue, context and store.
    inject('hello', msg => alert(`Hello ${msg}!`))
}