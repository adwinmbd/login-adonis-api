export default function ({ $auth, redirect }) {
  if ($auth.loggedIn && $auth.user.is_admin) {
    // allow admin access
  } else {
    return redirect('/')
  }
  /*
  if (!$auth.loggedIn && !$auth.user.is_admin) {
    return redirect('/')
  }
  */
}
