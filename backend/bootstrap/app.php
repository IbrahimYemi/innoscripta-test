<?php

use App\Console\Commands\FetchNewsFromApiHourly;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Console\Scheduling\Schedule;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->api(prepend: [
            \Illuminate\Session\Middleware\StartSession::class,
            \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
        ]);

        $middleware->alias([
            'verified' => \App\Http\Middleware\EnsureEmailIsVerified::class,
        ]);
        
    })
    ->withSchedule(function (Schedule $schedule) {
        $schedule->call('news:fetch-hourly')->daily();
        $schedule->call('news:fetch-12-hourly')->dailyAt('18:00');
        $schedule->command('news:fetch-meta')->hourly();
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();