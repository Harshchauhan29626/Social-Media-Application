<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CommentRequest;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\JsonResponse;

class CommentController extends Controller
{
    public function store(CommentRequest $request, Post $post): JsonResponse
    {
        $comment = Comment::create([
            'user_id' => $request->user()->id,
            'post_id' => $post->id,
            'content' => $request->validated()['content'],
        ])->load('user:id,name');

        return response()->json($comment, 201);
    }

    public function destroy(Comment $comment): JsonResponse
    {
        abort_if($comment->user_id !== auth()->id(), 403, 'Unauthorized');
        $comment->delete();

        return response()->json(['message' => 'Comment deleted']);
    }
}
