import { Link, BlitzPage, useMutation } from "blitz"
import Layout from "app/layouts/Layout"
import logout from "app/auth/mutations/logout"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import { Suspense } from "react"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <div className="flex justify-end items-center text-white bg-red-800 h-full px-4">
        <div>
          <span className="inline-block mr-2 lowercase">
            User id: <code className="font-bold text-sm">{currentUser.id}</code>
          </span>
          <span className="inline-block mr-2 lowercase">
            User role: <code className="font-bold text-sm">{currentUser.role}</code>
          </span>
        </div>
        <div>
          <button
            className="button small"
            onClick={async () => {
              await logoutMutation()
            }}
          >
            <span className="inline-block font-bold">Logout</span>
          </button>
        </div>
      </div>
    )
  } else {
    return (
      <div className="flex justify-end items-center bg-white h-full px-2">
        <Link href="/signup">
          <a className="button small">
            <span className="inline-block m-4 text-blue-500 font-bold">Sign Up</span>
          </a>
        </Link>
        <Link href="/login">
          <a className="button small">
            <strong className="inline-block m-4 text-blue-500 font-bold">Login</strong>
          </a>
        </Link>
      </div>
    )
  }
}

const Home: BlitzPage = () => {
  return (
    <div className="bg-gray-300 h-screen text-gray-600 flex flex-col">
      {/* NAV */}
      <div className="h-12 bg-red-200">
        <Suspense fallback="Loading...">
          <UserInfo />
        </Suspense>
      </div>

      <div className="flex flex-1">
        <div className="bg-gray-800 p-6 w-64">sidebar</div>
        <div className="flex-1">
          <div className="p-8">
            <h1 className="text-2xl text-gray-800">Content</h1>
            <div className="bg-gray-500 h-4 mt-4"></div>
            <div className="bg-gray-500 h-4 mt-4"></div>
            <div className="bg-gray-500 h-4 mt-4"></div>
            <div className="bg-gray-500 h-4 mt-4"></div>
            <div className="bg-gray-500 h-4 mt-4"></div>
            <div className="bg-gray-500 h-4 mt-4"></div>
            <div className="bg-gray-500 h-4 mt-4"></div>
            <div className="bg-gray-500 h-4 mt-4"></div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="flex justify-center items-end h-12 bg-gray-300">FOOTER</div>
    </div>
  )
}

Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
