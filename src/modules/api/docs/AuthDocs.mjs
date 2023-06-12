import _ from "lodash";

const RESPONSE = {
  SUCCESS: { 200: { description: "successful operation" } },
  INVALID_INPUT: { 405: { description: "Invalid input" } },
  FAIL: { 400: { description: "fail operation" } },
}

export const AuthDocs = {
  LOGIN: {
    tags: ["user"],
    summary: 'Authorize user',
    parameters: [
      {
        in: 'body',
        name: 'body',
        schema: {
          type: "object",
          properties: {
            username: { type: "string", example: "abc123" },
            password: { type: "string", example: "123456a" },
          }
        }
      }
    ],
    responses: _.merge(
      RESPONSE.SUCCESS, RESPONSE.INVALID_INPUT
    )
  }
}