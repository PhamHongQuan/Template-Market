"use client";


import { forwardRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

interface CaptchaProps {
    onChange: (token: string) => void;
}

const Captcha = forwardRef<ReCAPTCHA, CaptchaProps>(
    ({ onChange }, ref) => {
        return (
            <ReCAPTCHA
                ref={ref}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                onChange={(token) => onChange(token ?? "")}
            />
        );
    }
);

Captcha.displayName = "Captcha";

export default Captcha;