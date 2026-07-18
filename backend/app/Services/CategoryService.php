<?php

namespace App\Services;

use App\Models\Category;
use App\Repositories\Interfaces\CategoryRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Str;

class CategoryService
{
    public function __construct(
        protected CategoryRepositoryInterface $repository
    ) {
    }

    public function create(array $data): Category
    {
        $data['slug'] = Str::slug($data['name']);

        return $this->repository->create($data);
    }

    public function update(Category $category, array $data): Category
    {
        if (isset($data['name'])) {
            $data['slug'] = Str::slug($data['name']);
        }

        return $this->repository->update($category, $data);
    }

    public function delete(Category $category): bool
    {
        return $this->repository->delete($category);
    }

    public function findById(int $id): ?Category
    {
        return $this->repository->findById($id);
    }

    public function findBySlug(string $slug): ?Category
    {
        return $this->repository->findBySlug($slug);
    }

    public function getAll(): Collection
    {
        return $this->repository->getAll();
    }
}
