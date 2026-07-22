<?php

namespace App\Providers;

use App\Repositories\CartItemRepository;
use App\Repositories\CartRepository;
use App\Repositories\CategoryRepository;
use App\Repositories\Interfaces\CartItemRepositoryInterface;
use App\Repositories\Interfaces\CartRepositoryInterface;
use App\Repositories\Interfaces\CategoryRepositoryInterface;
use App\Repositories\Interfaces\TemplateAssetRepositoryInterface;
use App\Repositories\Interfaces\TemplateRepositoryInterface;
use App\Repositories\Interfaces\UserRepositoryInterface;
use App\Repositories\TemplateAssetRepository;
use App\Repositories\TemplateRepository;
use App\Repositories\UserRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(
            UserRepositoryInterface::class,
            UserRepository::class
        );

        $this->app->bind(
            TemplateRepositoryInterface::class,
            TemplateRepository::class
        );

        $this->app->bind(
            CategoryRepositoryInterface::class,
            CategoryRepository::class
        );

        $this->app->bind(
            TemplateAssetRepositoryInterface::class,
            TemplateAssetRepository::class
        );

        $this->app->bind(
            CartRepositoryInterface::class,
            CartRepository::class
        );

        $this->app->bind(
            CartItemRepositoryInterface::class,
            CartItemRepository::class
        );
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
