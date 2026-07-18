<?php

namespace App\Http\Controllers\api\Category;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Category\StoreCategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Services\CategoryService;

class CategoryController extends Controller
{
    public function __construct(
        protected CategoryService $service
    ) {
    }


    // Show all categories
    public function index()
    {
        $categories = $this->service->getAll();

        return ApiResponse::success(
            CategoryResource::collection($categories)
        );
    }


    // Show a single category by ID
    public function show(int $id)
    {
        $category = $this->service->findById($id);

        return ApiResponse::success(
            new CategoryResource($category)
        );
    }


    // Store a new category
    public function store(StoreCategoryRequest $request)
    {
        $category = $this->service->create(
            $request->validated()
        );

        return ApiResponse::success(
            new CategoryResource($category),
            'Category created successfully.',
            201
        );
    }
}
