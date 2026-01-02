import { cache } from "react";
import { KindeToken } from "./types";

export const getKindeM2MToken = cache(async (): Promise<string> => {
  const kindeIssuerUrl = process.env.KINDE_ISSUER_URL;
  const clientId = process.env.KINDE_M2M_CLIENT_ID;
  const clientSecret = process.env.KINDE_M2M_CLIENT_SECRET;
  const kindeAudience = process.env.KINDE_M2M_AUDIENCE;

  if (!kindeIssuerUrl || !clientId || !clientSecret || !kindeAudience) {
    throw new Error(
      "Missing Kinde M2M environment variables. Check KINDE_M2M_CLIENT_ID, KINDE_M2M_CLIENT_SECRET, KINDE_AUDIENCE, and KINDE_ISSUER_URL"
    );
  }
  const searchParams = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: clientId,
    client_secret: clientSecret,
    audience: kindeAudience,
  });
  try {
    console.log("🔑 Requesting M2M token from Kinde...");

    const res = await fetch(`${kindeIssuerUrl}/oauth2/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: searchParams,
      // Cache the token for 50 minutes (Kinde tokens typically last 1 hour)
      next: { revalidate: 3000 }, // 50 minutes in seconds
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("❌ Kinde M2M token request failed:", errorText);
      throw new Error(
        `Failed to get M2M token: ${res.status} ${res.statusText}`
      );
    }

    const token: KindeToken = await res.json();

    if (!token.access_token) {
      throw new Error("No access_token in response");
    }

    console.log("✅ M2M token received successfully");
    return token.access_token;
  } catch (err) {
    console.error("❌ Error getting Kinde M2M token:", err);
    throw new Error(
      `Failed to authenticate with Kinde Management API: ${
        err instanceof Error ? err.message : "Unknown error"
      }`
    );
  }
});
