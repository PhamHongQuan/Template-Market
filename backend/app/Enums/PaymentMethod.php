<?php

namespace App\Enums;

enum PaymentMethod: string
{
    case VNPAY = 'vnpay';

    case MOMO = 'momo';

    case PAYPAL = 'paypal';

    case STRIPE = 'stripe';
}
