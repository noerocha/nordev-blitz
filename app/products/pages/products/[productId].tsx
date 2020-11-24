import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import getProduct from "app/products/queries/getProduct"
import deleteProduct from "app/products/mutations/deleteProduct"
import voteOnRequest from "app/requests/mutations/voteOnRequest"
import { useCurrentUser } from "app/hooks/useCurrentUser"

export const Product = () => {
  const router = useRouter()
  const productId = useParam("productId", "number")
  const [product, { refetch }] = useQuery(getProduct, { where: { id: productId } })
  const [deleteProductMutation] = useMutation(deleteProduct)

  const [voteOnRequestMutation] = useMutation(voteOnRequest)

  const currentUser = useCurrentUser()

  return (
    <div className="bg-indigo-100">
      <h1>Product {product.id}</h1>
      {/* <pre>{JSON.stringify(product, null, 2)}</pre> */}

      <header className="flex flex-row m-4 items-center">
        <h2 className="text-lg text-gray-700 font-extrabold uppercase text-left tracking-tight leading-tight">
          Product feature requests
        </h2>
        <span className="ml-auto">
          <Link href="/requests/new">
            <a className="btn-blue">New request</a>
          </Link>
        </span>
      </header>

      <ul className="space-y-4 p-4 bg-gray-200">
        {product.requests.map((r) => (
          <li key={r.id} className="p-4 shadow rounded flex flex-row space-x-4 bg-white">
            <div className="border rounded">
              <button
                className="space-y-4 px-2 py-3 flex flex-col items-center hover:bg-yellow-200"
                onClick={async () => {
                  await voteOnRequestMutation({
                    data: {
                      user: { connect: { id: currentUser?.id } },
                      request: { connect: { id: r.id } },
                    },
                  })
                  refetch()
                }}
              >
                <span>{r.votesOnRequest?.length || 0}</span>
                <span>Vote</span>
              </button>
            </div>
            <div className="flex flex-col">
              <span className="text-xl">{r.title}</span>
              <p className="text-xl">{r.description}</p>
            </div>
          </li>
        ))}
      </ul>

      <h2 className="text-lg font-semibold text-left bg-indigo-200 text-gray-600 px-2 py-3 m-4">
        Actions
      </h2>

      <Link href={`/products/${product.id}/edit`}>
        <a>Edit</a>
      </Link>

      <button
        type="button"
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deleteProductMutation({ where: { id: product.id } })
            router.push("/products")
          }
        }}
      >
        Delete
      </button>
    </div>
  )
}

const ShowProductPage: BlitzPage = () => {
  return (
    <div className="max-w-screen-lg mx-auto">
      <p>
        <Link href="/products">
          <a>Products</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Product />
      </Suspense>
    </div>
  )
}

ShowProductPage.getLayout = (page) => <Layout title={"Product"}>{page}</Layout>

export default ShowProductPage
