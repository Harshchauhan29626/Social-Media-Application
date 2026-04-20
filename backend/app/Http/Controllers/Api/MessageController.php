<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\MessageRequest;
use App\Models\Message;
use Illuminate\Http\JsonResponse;

class MessageController extends Controller
{
    public function index(int $userId): JsonResponse
    {
        $messages = Message::where(function ($query) use ($userId) {
            $query->where('sender_id', auth()->id())->where('receiver_id', $userId);
        })->orWhere(function ($query) use ($userId) {
            $query->where('sender_id', $userId)->where('receiver_id', auth()->id());
        })->with(['sender:id,name', 'receiver:id,name'])->latest()->limit(100)->get()->reverse()->values();

        return response()->json($messages);
    }

    public function store(MessageRequest $request): JsonResponse
    {
        abort_if((int) $request->receiver_id === auth()->id(), 422, 'Cannot send message to yourself');

        $message = Message::create([
            'sender_id' => auth()->id(),
            'receiver_id' => $request->validated()['receiver_id'],
            'content' => $request->validated()['content'],
        ])->load(['sender:id,name', 'receiver:id,name']);

        return response()->json($message, 201);
    }
}
