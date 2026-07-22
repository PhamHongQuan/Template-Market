<?php

namespace App\Repositories\Interfaces;

use App\Models\OwnedTemplate;
use Illuminate\Database\Eloquent\Collection;

interface OwnedTemplateRepositoryInterface
{
    /**
     * Create a new owned template record.
     */
    public function create(array $data): OwnedTemplate;

    /**
     * Check if user already owns a template.
     */
    public function exists(
        int $userId,
        int $templateId
    ): bool;

    /**
     * Get all templates owned by a user.
     */
    public function getByUserId(int $userId): Collection;

    /**
     * Find owned template by id.
     */
    public function findById(int $id): ?OwnedTemplate;

    /**
     * Delete owned template.
     */
    public function delete(int $id): bool;
}
