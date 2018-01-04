<?php

namespace App\Http\Controllers;

use App\SocialProfile;
use App\User;
use Socialite;

class SocialAuthController extends Controller
{
    public function facebook()
    {
        return Socialite::driver('facebook')->redirect();
    }

    public function callback()
    {
        $user = Socialite::with('facebook')->user();
        // dd($user);
        $existing = User::whereHas('socialProfiles', function ($query) use ($user) {
            $query->where('social_id', $user->id);
        })->first();

        if ($existing !== null) {
            auth()->login($existing);
            return redirect('/');
        }

        // session()->flash('facebookUser', $user);

        $userinsert = User::create([
            'fullname' => $user->name,
            'email'    => $user->email,
            'password' => str_random(16),
        ]);
        $profile = SocialProfile::create([
            'social_id' => $user->id,
            'user_id'   => $userinsert->id,
        ]);

        auth()->login($userinsert);
        return redirect('/');
    }
}
