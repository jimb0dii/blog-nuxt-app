export default function({ req, store }) {
  store.dispatch('initAuth', req)
}
