// src/app/dashboard/page.tsx

"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkSession() {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        router.push("/"); // Si no hay sesión, redirige a Home
      } else {
        setLoading(false); // Si hay sesión, deja ver el dashboard
      }
    }

    checkSession();
  }, [supabase, router]);

  if (loading) {
    return <div className="h-screen flex items-center justify-center">Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl" />
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-center">
              Bienvenido a tu Área de Cliente de Seguro con IA
            </h1>
            <p className="text-center mt-4 text-gray-600">
              Aquí puedes gestionar tus pólizas, analizar su contenido y hacer consultas inteligentes.
            </p>
            {/* Tu contenido adicional aquí */}
          </div>
        </div>
      </div>
    </div>
  );
}
