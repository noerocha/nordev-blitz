import { Ctx } from "blitz"
import db, { VotesOnRequestCreateArgs } from "db"

type VotesOnRequestInput = Pick<VotesOnRequestCreateArgs, "data">

export default async function voteOnRequest({ data }: VotesOnRequestInput, ctx: Ctx) {
  ctx.session.authorize()

  const { userId } = ctx.session

  const request = await db.votesOnRequest.create({
    data: { ...data, user: { connect: { id: userId } } },
  })

  return request
}
