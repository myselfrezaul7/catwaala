export async function submitToWeb3Forms(data: any) {
    // Use env var or the key provided by user directly
    const access_key = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "433d256b-0920-4c9b-829b-3c18bd195c3c";

    if (!access_key) {
        console.error("Web3Forms Access Key is missing from environment variables!");
        return { success: false, message: "Server configuration error: Missing Email API Key." };
    }

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                access_key,
                ...data,
                subject: data.subject || `New Submission from Catwaala`,
            }),
        });

        const result = await response.json();
        if (!result.success) {
            console.error("Web3Forms API Error:", result);
            return { success: false, message: result.message || "Failed to send email." };
        }
        return result;
    } catch (error) {
        console.error("Web3Forms Network Error:", error);
        return { success: false, message: "Network error occurred while sending email." };
    }
}
