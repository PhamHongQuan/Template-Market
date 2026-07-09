<?php

namespace App\Http\Controllers\api\Account;

use App\Http\Controllers\Controller;
use App\Http\Requests\Account\ChangePasswordRequest;
use App\Http\Requests\Account\UpdateProfileRequest;
use App\Services\AccountService;
use App\Http\Resources\UserResource;
use App\Helpers\ApiResponse;
use Illuminate\Http\Request;

class AccountController extends Controller
{
    public function __construct(
        protected AccountService $accountService
    ) {}

    // Get profile of the authenticated user
    public function me(Request $request)
    {
        $result = new UserResource(
            $this->accountService->me($request->user())
        );

        return ApiResponse::success(
            $result,
            'Get profile successfully.'
        );
    }


    // Update profile of the authenticated user
    public function update(UpdateProfileRequest $request)
    {
        $result = new UserResource(
            $this->accountService->update(
                $request->user(),
                $request->validated()
            )
        );

        return ApiResponse::success(
            $result,
            'Profile updated successfully.',
            200
        );
    }


    // Change password of the authenticated user
    public function changePassword(ChangePasswordRequest $request)
    {
        $this->accountService->changePassword(
            $request->user(),
            $request->validated()
        );

        return ApiResponse::success(
            null,
            'Password changed successfully.',
            200
        );
    }
}
