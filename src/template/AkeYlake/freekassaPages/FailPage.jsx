import React, { useState, useEffect } from "react";

function failPage() {
    const [error, setError] = useState(null);
    useEffect(() => {
    fetch("/api/fail", {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }).then(res => res.json()).then(
            (result) => {
                console.log(result);
                <div>{result}</div>
            },
            (error) => {
                setError(error);
            }
        );
    }, []);
}

export default failPage;