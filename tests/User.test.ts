import { createTestContext } from './__helpers'

const ctx = createTestContext()

it('mutation - signUpUser', async () => {
  const signUpUserResult = await ctx.client.send(`
    mutation {
      signUpUser(email: "jenny@email.com", password: "123456") {
        id
        email
        password
        isSignIn
      }
    }
  `)
  
  expect(signUpUserResult).toMatchInlineSnapshot(`
    Object {
      "signUpUser": Object {
        "email": "jenny@email.com",
        "id": "cuid4",
        "isSignIn": false,
        "password": "123456",
      },
    }
  `)
})

it('query - users', async () => {
  const usersResult = await ctx.client.send(`
    query {
      users {
        id
        email
        isSignIn
        password
      }
    }
  `)

  expect(usersResult).toMatchSnapshot();
})

it('mutation - signInUser', async () => {
  const signInUserResult = await ctx.client.send(`
    mutation {
      signInUser(email: "jenny@email.com", password: "123456") {
        id
        email
        password
        isSignIn
      }
    }
  `)
  
  expect(signInUserResult).toMatchInlineSnapshot(`
    Object {
      "signInUser": Object {
        "email": "jenny@email.com",
        "id": "cuid4",
        "isSignIn": true,
        "password": "123456",
      },
    }
  `)
})

it('query - signInUsers', async () => {
  const signInUsersResult = await ctx.client.send(`
    query {
      signInUsers {
        email
        id
        isSignIn
        password
      }
    }
  `)

  expect(signInUsersResult).toMatchSnapshot();
  expect(signInUsersResult.signInUsers[0].isSignIn).toBeTruthy();
})