<?php

namespace App\Http\Controllers;

use App\Models\Certificate;
use App\Models\Module;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CertificateController extends Controller
{
    /**
     * GET /api/certificates
     * Semua sertifikat milik user yang login.
     */
    public function index()
    {
        $certificates = Certificate::with('module')
            ->where('user_id', auth()->id())
            ->orderBy('issued_at', 'desc')
            ->get()
            ->map(fn($cert) => $this->format($cert));

        return response()->json(['data' => $certificates]);
    }

    /**
     * POST /api/certificates/generate
     * Generate sertifikat setelah lulus kuis (score >= 70).
     * Jika sudah ada, kembalikan yang lama.
     */
    public function generate(Request $request)
    {
        $request->validate([
            'module_slug' => 'required|string|exists:modules,slug',
            'score'       => 'required|integer|min:0|max:100',
        ]);

        if ($request->score < 70) {
            return response()->json([
                'success' => false,
                'message' => 'Skor minimum untuk mendapatkan sertifikat adalah 70.',
            ], 422);
        }

        $module = Module::where('slug', $request->module_slug)->firstOrFail();
        $userId = auth()->id();

        $existing = Certificate::where('user_id', $userId)
            ->where('module_id', $module->id)
            ->first();

        if ($existing) {
            return response()->json([
                'success' => true,
                'message' => 'Sertifikat sudah diterbitkan sebelumnya.',
                'data'    => $this->format($existing->load('module')),
            ]);
        }

        $certificate = Certificate::create([
            'user_id'            => $userId,
            'module_id'          => $module->id,
            'certificate_number' => 'DIVE3D-' . strtoupper(Str::random(4)) . '-' . date('Ymd') . '-' . $userId,
            'score'              => $request->score,
            'issued_at'          => now(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Sertifikat berhasil diterbitkan!',
            'data'    => $this->format($certificate->load('module')),
        ], 201);
    }

    /**
     * GET /api/certificates/verify/{certificate_number}
     * Verifikasi keaslian sertifikat (publik, tanpa auth).
     */
    public function verify($certificateNumber)
    {
        $cert = Certificate::with(['user', 'module'])
            ->where('certificate_number', $certificateNumber)
            ->first();

        if (!$cert) {
            return response()->json([
                'valid'   => false,
                'message' => 'Sertifikat tidak ditemukan atau tidak valid.',
            ], 404);
        }

        return response()->json([
            'valid' => true,
            'data'  => [
                'certificate_number' => $cert->certificate_number,
                'recipient_name'     => $cert->user->name,
                'module_title'       => $cert->module->title,
                'score'              => $cert->score,
                'issued_at'          => $cert->issued_at,
            ],
        ]);
    }

    private function format(Certificate $cert): array
    {
        return [
            'id'                 => $cert->id,
            'certificate_number' => $cert->certificate_number,
            'module_title'       => $cert->module->title,
            'module_slug'        => $cert->module->slug,
            'score'              => $cert->score,
            'issued_at'          => $cert->issued_at,
        ];
    }
}
