<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Services\AuthService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class AuthController extends Controller
{
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => 'required|string|min:8',
        ]);

        // Check if validation fails
        if ($validator->fails()) {
            return $this->sendError('Validation Error', $validator->errors()->toArray(), 422);
        }

        // Proceed with registration if validation passes
        $validated = $validator->validated();

        $user = $this->authService->register($validated);
        $token = null;

        // Attempt login after successful registration
        if (auth()->attempt(['email' => $user->email, 'password' => $request->password])) {
            $user = auth()->user();
            $token = $user->createToken('authToken')->plainTextToken;

            // Send success response with user data and token
            return $this->sendResponse($user, 'Registered successfully', 201, $token);
        } else {
            return $this->sendError('Server Error', [], 500);
        }
    }

    public function logout(Request $request, $status=false)
    {
        $user = $request->user();
        $user->currentAccessToken()->delete();
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Custom error message for non-existing email
        if ($validator->fails()) {
            return $this->sendError('Invalid credentials', [], 401);
        }

        // Check if the email exists in the database
        $user = User::where('email', $request->email)->first();
        if (!$user) {
            return $this->sendError('Invalid credentials', [], 401);
        }

        $login = $this->authService->login($validator->validated());

        if ($login) {
            return $this->sendResponse($login['user'], 'Login successful', 201, $login['token']);
        }

        return $this->sendError('Invalid credentials', [], 401);
    }
    
    public function passwordManager(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'current_password' => 'required|string',
            'new_password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error', $validator->errors()->toArray(), 422);
        }

        if ($this->authService->changePassword( $validator->validated()['current_password'], $validator->validated()['new_password'])) {
            return $this->sendResponse([], 'Password changed successfully');
        }

        return $this->sendError('Current password is incorrect', [], 400);
    }
}



