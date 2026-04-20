<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class FollowController extends Controller
{
    public function toggle(User $user): JsonResponse
    {
        $authUser = auth()->user();
        abort_if($authUser->id === $user->id, 422, 'Cannot follow yourself');

        $exists = $authUser->following()->where('following_id', $user->id)->exists();

        if ($exists) {
            $authUser->following()->detach($user->id);

            return response()->json(['following' => false]);
        }

        $authUser->following()->attach($user->id);

        return response()->json(['following' => true]);
    }

    public function connections(User $user): JsonResponse
    {
        return response()->json([
            'followers' => $user->followers()->select('users.id', 'users.name', 'users.profile_image')->get(),
            'following' => $user->following()->select('users.id', 'users.name', 'users.profile_image')->get(),
        ]);
    }
}
