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
      <div className="flex justify-end items-center w-full bg-red-200">
        <div>
          <span className="inline-block mr-2 lowercase">
            User id: <code className="font-bold text-sm">{currentUser.id}</code>
          </span>
          <span className="inline-block mr-2 lowercase">
            User role: <code className="font-bold text-sm">{currentUser.role}</code>
          </span>
        </div>

        <button
          className="button small"
          onClick={async () => {
            await logoutMutation()
          }}
        >
          <span className="inline-block m-4 text-blue-500 font-bold">Logout</span>
        </button>
      </div>
    )
  } else {
    return (
      <div className="flex justify-end w-full bg-red-200">
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
    <div className="flex flex-col bg-red-600 min-h-screen min-w-full">
      <div className="flex-none m-4">
        <Suspense fallback="Loading...">
          <UserInfo />
        </Suspense>
      </div>

      {/* <div className="flex-none h-16">
        <Suspense fallback="Loading...">
          <UserInfo />
        </Suspense>
      </div> */}

      <div className="flex-auto bg-gray-700">
        <div className="flex flex-col justify-center items-center bg-red-700 m-4">
          <div className="bg-red-500 h-56 w-56">A</div>
          {/* <div className="h-56 w-full text-white bg-black">A</div>
          <div className="h-56 w-full text-white bg-black">A</div> */}
        </div>
        {/* <div className="flex flex-col items-center justify-center bg-blue-900">
          <div className="bg-white h-56 w-full">Content 1</div>
          <div className="flex justify-center items-center bg-red-900 h-56 w-full">Content 2</div>
        </div> */}
      </div>

      {/* <div className="flex-grow bg-green-200">
        <div className="flex flex-col justify-center content-center">
          <div className="bg-blue-100 my-2 p-4">100</div>
          <div className="bg-blue-200 my-2 p-4">200</div>
          <div className="bg-blue-300 my-2 p-4">300</div>
          <div className="bg-blue-400 my-2 p-4">400</div>
          <div className="bg-blue-500 my-2 p-4">500</div>
          <div className="bg-blue-600 my-2 p-4">600</div>
          <div className="bg-blue-700 my-2 p-4">700</div>
          <div className="bg-blue-800 my-2 p-4">800</div>
          <div className="bg-blue-900 my-2 p-4">900</div>
        </div>
      </div> */}

      <div className="flex-none h-16 bg-gray-300">FOOTER</div>
    </div>
  )
}

Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
