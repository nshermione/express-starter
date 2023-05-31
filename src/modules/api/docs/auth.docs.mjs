export const AuthDocs = {
  GET_USER_INFO: {
    tags: ["Auth"],
    summary: 'Get user info',
    body: {
      userId: { type: "string", example: "abcdef123" },
    },
    responses: { "405": { "description": "Invalid input" } }
  }
}