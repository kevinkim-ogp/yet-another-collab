import type * as Party from "partykit/server";
import { onConnect } from "y-partykit";

export default class YjsServer implements Party.Server {
  constructor(public party: Party.Room) {}

  static async onBeforeConnect(request: Party.Request) {
    const origin = request.headers.get("origin");

    const allowedOrigins = [
      "http://localhost:5173",
      "https://yet-another-collab.kevin-kim.xyz",
    ];

    // Only allow if origin exists AND is in allowed list
    if (origin && allowedOrigins.includes(origin)) {
      return; // Allow connection
    }

    // Block everything else (including missing origin)
    return new Response("Unauthorized", { status: 403 });
  }

  onConnect(conn: Party.Connection) {
    return onConnect(conn, this.party, {
      // ...options
    });
  }
}
