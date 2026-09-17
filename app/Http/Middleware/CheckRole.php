<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        if (!auth()->check()) {
            return redirect('login');
        }

        $userRole = auth()->user()->role;

        // Jika user memiliki salah satu role yang diizinkan, lanjutkan
        if (in_array($userRole, $roles)) {
            return $next($request);
        }

        abort(403, 'Unauthorized action. Anda tidak memiliki hak akses ke halaman ini.');
    }
}