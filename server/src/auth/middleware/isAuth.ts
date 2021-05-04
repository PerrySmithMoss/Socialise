import { verify } from "jsonwebtoken";
import { MiddlewareFn } from "type-graphql"
import { MyContext } from "../../Types/MyContext"

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
    const authorization = context.req.headers['authorization']
  
    if (!authorization) {
      throw new Error('Not authenticated')
    }
  
    try {
      const token = authorization.split(' ')[1]
      const payload = verify(token, process.env.ACCESS_KEY!)
      context.payload = payload as any
    } catch (e) {
      console.log(e)
      throw new Error('There was a problem authorizing your account...' + e)
    }
    return next()
  }