<?php

namespace App\Repositories;

use App\Models\OwnedTemplate;
use App\Repositories\Interfaces\OwnedTemplateRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class OwnedTemplateRepository implements OwnedTemplateRepositoryInterface
{
    /**
     * Create a new owned template record.
     */
    public function create(array $data): OwnedTemplate
    {
        return OwnedTemplate::create($data);
    }

    /**
     * Check if user already owns a template.
     */
    public function exists(
        int $userId,
        int $templateId
    ): bool {
        return OwnedTemplate::where('user_id', $userId)
            ->where('template_id', $templateId)
            ->exists();
    }

    /**
     * Get all templates owned by a user.
     */
    public function getByUserId(int $userId): Collection
    {
        return OwnedTemplate::with([
            'template.category',
            'template.thumbnail',
        ])
            ->where('user_id', $userId)
            ->latest()
            ->get();
    }

    /**
     * Find owned template by id.
     */
    public function findById(int $id): ?OwnedTemplate
    {
        return OwnedTemplate::with([
            'template.category',
            'template.thumbnail',
        ])
            ->find($id);
    }

    /**
     * Delete owned template.
     */
    public function delete(int $id): bool
    {
        $ownedTemplate = OwnedTemplate::find($id);

        if (!$ownedTemplate) {
            return false;
        }

        return (bool) $ownedTemplate->delete();
    }
}
