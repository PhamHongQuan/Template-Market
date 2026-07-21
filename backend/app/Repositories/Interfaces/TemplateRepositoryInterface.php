<?php

namespace App\Repositories\Interfaces;

use App\Models\Template;
use App\Models\User;
use Illuminate\Pagination\LengthAwarePaginator;

interface TemplateRepositoryInterface
{
    public function create(array $data): Template;

    public function update(Template $template, array $data): Template;

    public function delete(Template $template): bool;

    public function findById(int $id): ?Template;

    public function findBySlug(string $slug): ?Template;

    public function paginate(
        int $perPage = 15,
        array $filters = []
    ): LengthAwarePaginator;

    public function myTemplates(User $user);
}
