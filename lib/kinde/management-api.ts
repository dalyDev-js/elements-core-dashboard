import { getKindeM2MToken } from "./client";
import { CreateKindeUserPayload, KindeUser } from "./types";

const getKindeApiUrl = () => {
  const issuerUrl = process.env.KINDE_ISSUER_URL;
  if (!issuerUrl) {
    throw new Error("KINDE_ISSUER_URL is not set");
  }
  return `${issuerUrl}/api/v1`;
};

export async function createKindeUser(
  data: CreateKindeUserPayload
): Promise<KindeUser> {
  try {
    //   Get M2M token
    const accessToken = await getKindeM2MToken();

    //   Call Kinde Management API
    const response = await fetch(`${getKindeApiUrl()}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    //  Handle response
    if (!response.ok) {
      const errorText = await response.text();

      // Parse error message if possible
      let errorMessage = `Failed to create user in Kinde: ${response.status}`;
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.message || errorJson.error || errorMessage;
      } catch {
        // Error text is not JSON, use default message
      }

      throw new Error(errorMessage);
    }

    const kindeUser: KindeUser = await response.json();

    return kindeUser;
  } catch (error) {
    console.error("❌ Error creating user in Kinde:", error);
    throw error;
  }
}

export async function deleteKindeUser(id: string): Promise<void> {
  try {
    // Get M2M token
    const accessToken = await getKindeM2MToken();

    const url = `${getKindeApiUrl()}/user?id=${id}`;

    // Make DELETE request
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    });

    // Handle response
    if (!response.ok) {
      const errorText = await response.text();

      // Special handling for 404 - user doesn't exist in Kinde
      if (response.status === 404) {
        console.warn(
          "⚠️ User not found in Kinde (404). They may have never been created in Kinde or were already deleted."
        );
        // Don't throw error - treat as success since user doesn't exist
        return;
      }

      // Parse error message if possible
      let errorMessage = `Failed to delete user from Kinde: ${response.status}`;
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.message || errorJson.error || errorMessage;
        console.error("❌ Kinde delete error (parsed):", errorJson);
      } catch {
        // Error text is not JSON, use default message
        console.error("❌ Kinde delete error (raw):", errorText);
      }

      console.error("❌ Full error details:", {
        status: response.status,
        statusText: response.statusText,
        url: url,
        message: errorMessage,
      });
      throw new Error(errorMessage);
    }

    console.log("✅ User deleted from Kinde:", id);
  } catch (error) {
    console.error("❌ Error deleting user from Kinde:", error);
    throw error;
  }
}
