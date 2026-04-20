<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PostRequest;
use App\Models\Post;
use Illuminate\Http\JsonResponse;

class PostController extends Controller
{
    public function index(): JsonResponse
    {
        $posts = Post::with(['user:id,name,profile_image', 'comments.user:id,name', 'likes'])
            ->withCount(['likes', 'comments'])
            ->latest()
            ->paginate(15);

        return response()->json($posts);
    }

    public function store(PostRequest $request): JsonResponse
    {
        $data = $request->validated();
        $data['user_id'] = $request->user()->id;

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('posts', 'public');
        }

        $post = Post::create($data)->load(['user:id,name,profile_image']);

        return response()->json($post, 201);
    }

    public function update(PostRequest $request, Post $post): JsonResponse
    {
        abort_if($post->user_id !== $request->user()->id, 403, 'Unauthorized');

        $data = $request->validated();
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('posts', 'public');
        }

        $post->update($data);

        return response()->json($post->fresh()->load(['user:id,name,profile_image']));
    }

    public function destroy(Post $post): JsonResponse
    {
        abort_if($post->user_id !== auth()->id(), 403, 'Unauthorized');
        $post->delete();

        return response()->json(['message' => 'Post deleted']);
    }
}
