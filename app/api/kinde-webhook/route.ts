import { NextResponse } from "next/server";
import jwksClient from "jwks-rsa";
import jwt from "jsonwebtoken";

const client = jwksClient({
  jwksUri: `${process.env.KINDE_ISSUER_URL}/.well-known/jwks.json`,
});

export async function POST(req: Request) {
  try {
    // Get the token from the request
    const token = await req.text();

    // Decode the token
    const jwtDecoded = jwt.decode(token, { complete: true });
    if (!jwtDecoded) {
      return NextResponse.json({ message: "Invalid token" }, { status: 400 });
    }
    const { kid } = jwtDecoded!.header;

    // Verify the token
    const key = await client.getSigningKey(kid);
    const signingKey = key.getPublicKey();
    const event = jwt.verify(token, signingKey) as jwt.JwtPayload;
    console.log("Verified event:", event);
    // if (typeof event === "string") {
    //   return NextResponse.json(
    //     { message: "Invalid type of event" },
    //     { status: 400 }
    //   );
    // }
    // Handle various events
    switch (event?.type) {
      case "user.updated":
        // handle user updated event
        // e.g update database with event.data
        console.log(event.data);
        break;
      case "user.created":
        // handle user created event
        // e.g add user to database with event.data
        console.log(event.data);
        break;
      default:
        // other events that we don't handle
        break;
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      return NextResponse.json({ message: err.message }, { status: 400 });
    }
  }
  return NextResponse.json({ status: 200, statusText: "success" });
}

// Verified event: {
//   data: {
//     user: {
//       email: 'abdulrhman.eldaly@gmail.com',
//       first_name: 'abdulrhman',
//       id: 'kp_b7828c8158134369a915d7baab820910',
//       is_password_reset_requested: false,
//       is_suspended: false,
//       last_name: 'eldaly',
//       organizations: [Array],
//       phone: null,
//       username: null
//     }
//   },
//   event_id: 'event_019a92c415aa98c11894f98e264e714f',
//   event_timestamp: '2025-11-17T19:01:55.39116+02:00',
//   source: 'admin',
//   timestamp: '2025-11-17T19:01:55.779533843+02:00',
//   type: 'user.created'
// }
// {
//   user: {
//     email: 'abdulrhman.eldaly@gmail.com',
//     first_name: 'abdulrhman',
//     id: 'kp_b7828c8158134369a915d7baab820910',
//     is_password_reset_requested: false,
//     is_suspended: false,
//     last_name: 'eldaly',
//     organizations: [ [Object] ],
//     phone: null,
//     username: null
//   }
// }
