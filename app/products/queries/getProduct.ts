import { Ctx, NotFoundError } from "blitz"
import db, { FindFirstProductArgs } from "db"

type GetProductInput = Pick<FindFirstProductArgs, "where">

export default async function getProduct({ where }: GetProductInput, ctx: Ctx) {
  ctx.session.authorize()

  const product = await db.product.findFirst({
    where,
    include: { requests: { include: { votesOnRequest: true } } },
  })

  if (!product) throw new NotFoundError()

  return product
}
