<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateProfileRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class ProfileController extends Controller
{
    public function me(): JsonResponse
    {
        $user = auth()->user()->loadCount(['followers', 'following']);

        return response()->json($user);
    }

    public function show(User $user): JsonResponse
    {
        return response()->json($user->loadCount(['followers', 'following']));
    }

    public function update(UpdateProfileRequest $request): JsonResponse
    {
        $data = $request->validated();

        if ($request->hasFile('profile_image')) {
            $data['profile_image'] = $request->file('profile_image')->store('profiles', 'public');
        }

        $user = $request->user();
        $user->update($data);

        return response()->json($user->fresh()->loadCount(['followers', 'following']));
    }
}
