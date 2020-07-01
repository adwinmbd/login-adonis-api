export default function ({ $auth, redirect }) {
  if ($auth.loggedIn && $auth.user.is_admin === 0) {
    // let user in
  } else {
    return redirect('/')
  }
}
