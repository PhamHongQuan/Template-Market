<?php

namespace App\Enums;

enum UserRole: int
{
    case CUSTOMER = 0;
    case SELLER = 1;
    case ADMIN = 2;

    public function label(): string
    {
        return match ($this) {
            self::CUSTOMER => 'Customer',
            self::SELLER => 'Seller',
            self::ADMIN => 'Admin',
        };
    }
}
