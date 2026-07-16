<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use App\Services\RecaptchaService;

class RecaptchaRule implements ValidationRule
{
    public function validate(
        string $attribute,
        mixed $value,
        Closure $fail
    ): void {

        $captcha = app(RecaptchaService::class);

        if (!$captcha->verify($value)) {
            $fail("Captcha verification failed.");
        }
    }
}
