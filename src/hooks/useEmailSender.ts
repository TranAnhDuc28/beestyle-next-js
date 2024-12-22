import { useState } from 'react';

function useEmailSender() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const sendEmail = async (data: { name: string; email: string; phone: string; message: string }) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch('/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setSuccess(true);
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Failed to send email.');
            }
        } catch (error: any) {
            setError(error.message || 'Error sending email.');
        } finally {
            setLoading(false);
        }
    };

    return { sendEmail, loading, error, success };
}

export default useEmailSender;
