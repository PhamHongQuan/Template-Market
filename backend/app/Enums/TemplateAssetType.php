<?php

namespace App\Enums;

enum TemplateAssetType: string
{
    case THUMBNAIL = 'thumbnail';
    case COVER = 'cover';
    case PREVIEW = 'preview';
    case SOURCE = 'source';
    case DEMO = 'demo';
    case DOCUMENT = 'document';
    case LICENSE = 'license';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
