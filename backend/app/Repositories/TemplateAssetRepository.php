<?php

namespace App\Repositories;

use App\Models\TemplateAsset;
use Illuminate\Database\Eloquent\Collection;
use App\Repositories\Interfaces\TemplateAssetRepositoryInterface;

class TemplateAssetRepository implements TemplateAssetRepositoryInterface
{

    // Create a new template asset
    public function create(array $data): TemplateAsset
    {
        return TemplateAsset::create($data);
    }


    // Delete a template asset
    public function delete(TemplateAsset $asset): bool
    {
        return (bool) $asset->delete();
    }


    // Find a template asset by its ID
    public function findById(int $id): TemplateAsset
    {
        return TemplateAsset::findOrFail($id);
    }


    // Get all assets of a template
    public function getByTemplateId(int $templateId): Collection {
        return TemplateAsset::query()
            ->where('template_id', $templateId)
            ->orderBy('sort_order')
            ->get();
    }


    // Find template assets by template ID and type
    public function getByType(int $templateId,string $type): Collection {
        return TemplateAsset::where('template_id', $templateId)
            ->where('asset_type', $type)
            ->orderBy('sort_order')
            ->get();
    }

    // Count template assets by template ID and type
    public function countByType(
        int $templateId,
        string $type
    ): int {

        return TemplateAsset::query()
            ->where('template_id', $templateId)
            ->where('asset_type', $type)
            ->count();
    }
}
