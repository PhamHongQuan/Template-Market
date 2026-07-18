<?php

namespace App\Http\Controllers\Api\Template;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Template\StoreTemplateRequest;
use App\Http\Requests\Template\UpdateTemplateRequest;
use App\Http\Requests\TemplateAsset\UploadPreviewRequest;
use App\Http\Requests\TemplateAsset\UploadSourceRequest;
use App\Http\Requests\TemplateAsset\UploadThumbnailRequest;
use App\Http\Resources\TemplateAssetResource;
use App\Http\Resources\TemplateResource;
use App\Services\TemplateAssetService;
use App\Services\TemplateService;
use Illuminate\Http\Request;

class TemplateController extends Controller
{
    public function __construct(
        protected TemplateService $service,
        protected TemplateAssetService $assetService
    ) {
    }


    // List templates with optional filters
    public function index(Request $request)
    {
        $templates = $this->service->paginate(
            $request->integer('per_page', 15),
            $request->only([
                'keyword',
                'category_id',
                'status',
            ])
        );

        return ApiResponse::success(
            TemplateResource::collection($templates)
        );
    }


    // Show a specific template by ID
    public function show(int $id)
    {
        return ApiResponse::success(
            new TemplateResource(
                $this->service->findById($id)
            )
        );
    }


    // Store a new template
    public function store(StoreTemplateRequest $request)
    {
        $template = $this->service->create(
            $request->validated()
        );

        return ApiResponse::success(
            new TemplateResource($template),
            'Template created successfully.',
            201
        );
    }


    // Update an existing template
    public function update(
        UpdateTemplateRequest $request,
        int $id
    ) {
        $template = $this->service->findById($id);

        $template = $this->service->update(
            $template,
            $request->validated()
        );

        return ApiResponse::success(
            new TemplateResource($template),
            'Template updated successfully.'
        );
    }


    // Delete a template by ID
    public function destroy(int $id)
    {
        $template = $this->service->findById($id);

        $this->service->delete($template);

        return ApiResponse::success(
            null,
            'Template deleted successfully.'
        );
    }


    // Upload a thumbnail for a template
    public function uploadThumbnail(
        UploadThumbnailRequest $request,
        int $id
    )
    {
        $template = $this->service->findById($id);

        $asset = $this->assetService->uploadThumbnail(
            $template,
            $request->file('file')
        );

        return ApiResponse::success(
            new TemplateAssetResource($asset),
            'Thumbnail uploaded successfully.'
        );
    }


    // Upload preview files for a template
    public function uploadPreview(
        UploadPreviewRequest $request,
        int $id
    )
    {
        $template = $this->service->findById($id);

        $assets = $this->assetService->uploadPreview(
            $template,
            $request->file('files')
        );

        return ApiResponse::success(
            TemplateAssetResource::collection($assets),
            'Preview images uploaded successfully.'
        );
    }


    // Upload a source file for a template
    public function uploadSource(
        UploadSourceRequest $request,
        int $id
    )
    {
        $template = $this->service->findById($id);

        $asset = $this->assetService->uploadSource(
            $template,
            $request->file('file')
        );

        return ApiResponse::success(
            new TemplateAssetResource($asset),
            'Source uploaded successfully.'
        );
    }

}
