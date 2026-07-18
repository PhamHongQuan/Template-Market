<?php

namespace App\Repositories;

use App\Models\Category;
use App\Repositories\Interfaces\CategoryRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class CategoryRepository implements CategoryRepositoryInterface
{

    // Create a new category
    public function create(array $data): Category
    {
        return Category::create($data);
    }


    // Update an existing category
    public function update(Category $category, array $data): Category
    {
        $category->update($data);

        return $category->refresh();
    }


    // Delete a category
    public function delete(Category $category): bool
    {
        return (bool) $category->delete();
    }


    // Find a category by its ID
    public function findById(int $id): ?Category
    {
        return Category::find($id);
    }


    // Find a category by its slug
    public function findBySlug(string $slug): ?Category
    {
        return Category::where('slug', $slug)->first();
    }


    // Get all categories ordered by name
    public function getAll(): Collection
    {
        return Category::orderBy('name')->get();
    }
}
