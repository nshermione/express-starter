export const AuthDocs = {
  GET_USER_INFO: {
    tags: ["user"],
    summary: 'Get user info',
    query: {
      userId: { type: "string", example: "abcdef123" },
    },
    responses: { "405": { "description": "Invalid input" } }
  }
}