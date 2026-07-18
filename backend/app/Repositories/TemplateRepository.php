<?php

namespace App\Repositories;

use App\Models\Template;
use App\Repositories\Interfaces\TemplateRepositoryInterface;
use Illuminate\Pagination\LengthAwarePaginator;

class TemplateRepository implements TemplateRepositoryInterface
{
    public function create(array $data): Template
    {
        return Template::create($data);
    }

    public function update(
        Template $template,
        array $data
    ): Template {

        $template->update($data);

        return $template->refresh();
    }

    public function delete(
        Template $template
    ): bool {

        return $template->delete();
    }

    public function findById(
        int $id
    ): Template {

        return Template::with([
            'category',
            'thumbnail',
            'source',
            'previews',
        ])->findOrFail($id);
    }

    public function findBySlug(
        string $slug
    ): ?Template {

        return Template::query()
            ->with([
                'category',
                'assets',
            ])
            ->where('slug', $slug)
            ->first();
    }

        public function paginate(
            int $perPage = 15,
            array $filters = []
        ): LengthAwarePaginator {

        $query = Template::query()
            ->with([
                'category',
                'assets',
            ]);

        if (!empty($filters['keyword'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('title', 'like', "%{$filters['keyword']}%")
                  ->orWhere('description', 'like', "%{$filters['keyword']}%");
            });
        }

        if (!empty($filters['category_id'])) {
            $query->where(
                'category_id',
                $filters['category_id']
            );
        }

        if (!empty($filters['status'])) {
            $query->where(
                'status',
                $filters['status']
            );
        }

        return $query
            ->latest()
            ->paginate($perPage);
    }
}
