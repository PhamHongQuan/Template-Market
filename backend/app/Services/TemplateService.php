<?php

namespace App\Services;

use App\Enums\TemplateStatus;
use App\Models\Template;
use App\Repositories\Interfaces\TemplateRepositoryInterface;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Str;

class TemplateService
{
    public function __construct(
        protected TemplateRepositoryInterface $repository
    ) {
    }

    public function create(array $data): Template
    {
        $data['slug'] = Str::slug($data['title']);
        $data['status'] = TemplateStatus::DRAFT;

        return $this->repository->create($data);
    }

    public function update(
        Template $template,
        array $data
    ): Template {

        if (isset($data['title'])) {
            $data['slug'] = Str::slug($data['title']);
        }

        unset($data['status']);

        return $this->repository->update(
            $template,
            $data
        );
    }

    public function delete(
        Template $template
    ): bool {

        return $this->repository->delete($template);
    }

    public function findById(
        int $id
    ): Template {

        return $this->repository->findById($id);
    }

    public function paginate(
        int $perPage = 15,
        array $filters = []
    ): LengthAwarePaginator {

        return $this->repository->paginate(
            $perPage,
            $filters
        );
    }
}
