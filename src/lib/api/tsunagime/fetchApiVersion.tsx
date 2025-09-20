export async function fetchApiVersion(): Promise<{ version: string }> {
    const fallback = { version: "unknown" };

    try {
        const res = await fetch("http://tsunagime-api:8000/api/v1/version", {
            cache: "no-store",
        });

        if (!res.ok) {
            console.error("API responded with error:", res.status);
            return fallback;
        }

        return await res.json();
    } catch (err) {
        console.error("Fetch failed:", err);
        return fallback;
    }
}