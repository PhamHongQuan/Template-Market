<?php

namespace App\Repositories\Interfaces;

use App\Models\TemplateAsset;
use Illuminate\Database\Eloquent\Collection;

interface TemplateAssetRepositoryInterface
{
    public function create(array $data): TemplateAsset;

    public function delete(
        TemplateAsset $asset
    ): bool;

    public function findById(
        int $id
    ): TemplateAsset;

    public function getByTemplateId(
        int $templateId
    ): Collection;

    public function getByType(
        int $templateId,
        string $type
    ): Collection;

    public function countByType(
        int $templateId,
        string $type
    ): int;
}
