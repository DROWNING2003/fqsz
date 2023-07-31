import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/auth'
const appid = process.env.appid    // 微信小程序 AppId
const appsecret = process.env.appsecret // 微信小程序 AppSecret

export const runtime = "edge";

export async function POST(req: Request) {
    const json = await req.json()
    const { messages, previewToken } = json
    const userId = (await auth())?.user.id
}

exports.main = async function (ctx: FunctionContext) {
  // body, query 为请求参数, auth 是授权对象
  const { auth, body, query } = ctx
  cloud.shared["access_token"] = await getAccessToken()
}

async function getAccessToken() {

  const api_url = `https://api.weixin.qq.com/cgi-bin/token`
  const param = `grant_type=client_credential&appid=${appid}&secret=${appsecret}`
  const res = await cloud.fetch(`${api_url}?${param}`)
  if (res.data.errcode > 0) {
    return null
  }

  return res?.data?.access_token
}