import React, { useEffect } from 'react';

const ReCAPTCHAComponent = ({ onVerify }) => {
    useEffect(() => {
        const loadRecaptcha = async () => {
            if (window.grecaptcha) {
                window.grecaptcha.ready(async () => {
                    const token = await window.grecaptcha.execute(process.env.REACT_APP_SITE_KEY, { action: 'submit' });
                    onVerify(token);
                });
            } else {
                console.error('reCAPTCHA not loaded');
            }
        };

        loadRecaptcha();
    }, [onVerify]);

    return null; // reCAPTCHA v3 is invisible
};

export default ReCAPTCHAComponent;
