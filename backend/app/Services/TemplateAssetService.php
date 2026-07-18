<?php

namespace App\Services;

use App\Enums\TemplateAssetType;
use App\Models\Template;
use App\Models\TemplateAsset;
use App\Repositories\Interfaces\TemplateAssetRepositoryInterface;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Throwable;

class TemplateAssetService
{
    public function __construct(
        protected TemplateAssetRepositoryInterface $repository
    ) {}


    // Store a template asset
    private function storeAsset(
        Template $template,
        UploadedFile $file,
        TemplateAssetType $type
    ): TemplateAsset {

        $directory = match ($type) {
            TemplateAssetType::SOURCE =>
                "templates/{$template->id}/source",

            TemplateAssetType::THUMBNAIL =>
                "templates/{$template->id}/thumbnail",

            TemplateAssetType::PREVIEW =>
                "templates/{$template->id}/preview",
        };

        $path = $file->store(
            $directory,
            's3'
        );

        DB::beginTransaction();

        try {

            $asset = $this->repository->create([
                'template_id'   => $template->id,
                'asset_type'    => $type->value,
                'path'          => $path,
                'original_name' => $file->getClientOriginalName(),
                'mime_type'     => $file->getMimeType(),
                'extension'     => $file->getClientOriginalExtension(),
                'size'          => $file->getSize(),
                'sort_order'    => $this->repository->countByType(
                    $template->id,
                    $type->value
                ),
            ]);

            DB::commit();

            return $asset;

        } catch (Throwable $e) {

            DB::rollBack();

            Storage::disk('s3')->delete($path);

            throw $e;
        }
    }


    // Upload a thumbnail for a template
    public function uploadThumbnail(
        Template $template,
        UploadedFile $file
    ): TemplateAsset
    {
        $oldThumbnail = $this->repository
            ->getByType(
                $template->id,
                TemplateAssetType::THUMBNAIL->value
            )
            ->first();

        if ($oldThumbnail) {
            $this->delete($oldThumbnail);
        }

        return $this->storeAsset(
            $template,
            $file,
            TemplateAssetType::THUMBNAIL
        );
    }


    // Upload a source file for a template
    public function uploadSource(
        Template $template,
        UploadedFile $file
    ): TemplateAsset
    {
        $oldSource = $this->repository
            ->getByType(
                $template->id,
                TemplateAssetType::SOURCE->value
            )
            ->first();

        if ($oldSource) {
            $this->delete($oldSource);
        }

        return $this->storeAsset(
            $template,
            $file,
            TemplateAssetType::SOURCE
        );
    }


    // Upload preview files for a template
    public function uploadPreview(
        Template $template,
        array $files
    ): Collection {

        return collect($files)->map(
            fn (UploadedFile $file) => $this->storeAsset(
                $template,
                $file,
                TemplateAssetType::PREVIEW
            )
        );
    }


    // Delete a template asset
    public function delete(
        TemplateAsset $asset
    ): bool {

        if ($asset->path) {
            Storage::disk('s3')->delete($asset->path);
        }
        return $this->repository->delete($asset);
    }


    // Find a template asset by its ID
    public function findById(
        int $id
    ): TemplateAsset {

        return $this->repository->findById($id);
    }


    // Get all assets of a template
    public function getByTemplateId(
        int $templateId
    ): EloquentCollection {

        return $this->repository->getByTemplateId(
            $templateId
        );
    }


    // Find template assets by template ID and type
    public function getByType(
        int $templateId,
        string $type
    ): EloquentCollection {

        return $this->repository->getByType(
            $templateId,
            $type
        );
    }


}
