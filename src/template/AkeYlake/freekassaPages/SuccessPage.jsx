import { useEffect, useState } from "react";

function SuccessPage() {
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("/api/notification", {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json())
        .then(
            (result) => {
                localStorage.setItem('paymentSuccess', 'true');
                window.location.href = `https://${process.env.REACT_APP_DOMAIN_NAME}`;

                if (result.status === 'error' && result.reason === 'Неверная подпись') {
                    console.log('Неверная подпись');
                }
            },
            (error) => {
                setError(error);
            }
        )
    }, []);

    return null;
}

export default SuccessPage;
