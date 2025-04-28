# **App Name**: Policy Insights AI

## Core Features:

- Core UI and Backend Integration: Landing page with user registration/login and policy upload form, integrated with Supabase Auth and n8n webhook.
- AI Policy Analysis: AI-powered analysis of uploaded insurance policies. This tool will use the document to provide key insights to the user.
- Analysis Presentation: Display user-friendly analysis results and personalized recommendations.

## Style Guidelines:

- Primary color: Navy Blue (#001F54) for a professional and trustworthy feel.
- Secondary color: Pure White (#FFFFFF) for clean and modern aesthetics.
- Accent color: Emerald Green (#00C853) to highlight key actions and AI insights.
- Responsive design adapting to both mobile and desktop devices.
- Use clean and minimalist icons to represent different insurance types or analysis steps.
- Incorporate subtle animations on buttons and form elements to enhance user experience.

## Original User Request:
Quiero crear una landing page moderna, profesional y confiable para presentar "Seguro con IA", un servicio que analiza pólizas de seguro mediante inteligencia artificial.

🎯 Objetivo de la web:
- Permitir el registro de usuarios (para asociar cada póliza a un usuario).
- Permitir que los usuarios suban su póliza en PDF después de registrarse o iniciar sesión.
- Preparar la web para conectarse con Supabase (autenticación y almacenamiento de datos) y n8n.

🔵 Estructura de la web:

1. **Página principal (Landing)**
   - Hero principal con:
     - Título: "Analiza tu Seguro con Inteligencia Artificial"
     - Subtítulo: "Regístrate, sube tu póliza y descubre si estás protegido."
     - Botón grande: "Registrarme"
   - Beneficios destacados (tres columnas o tarjetas):
     - Diagnóstico rápido y preciso
     - Recomendaciones personalizadas
     - Asesoría confidencial y gratuita
   - Sección "¿Cómo funciona?" (3 pasos ilustrados):
     - Sube tu póliza
     - Análisis automático por IA
     - Recibe diagnóstico y habla con tu póliza
   - Footer sencillo:
     - Aviso de privacidad
     - Datos de contacto (Email, WhatsApp)

2. **Registro/Login de Usuario**
   - Formulario de registro:
     - Nombre completo
     - Email
     - Teléfono
     - Contraseña
   - Alternativa: Magic Link por email (opcional)
   - Integrado con Supabase Auth para registrar/iniciar sesión de usuarios.

3. **Panel de Usuario (después del login)**
   - Mensaje de bienvenida: "Bienvenido, {{nombre_usuario}}"
   - Formulario de subida de póliza:
     - Seleccionar archivo PDF (subida obligatoria)
     - Seleccionar tipo de seguro (desplegable: Hogar, Auto, Salud, Vida, Otros)
     - Botón: "Subir y Analizar"
   - Este formulario debe enviar datos a un Webhook de n8n tras el submit.

4. **Conexión a Servicios (Backends)**
   - El formulario de subida de pólizas debe enviar los datos al Webhook configurado en n8n para:
     - Guardar la póliza en Supabase Storage
     - Activar la extracción de datos clave
     - Iniciar conversación en Chatwoot
   - Debe estar preparado para futuras extensiones como mostrar estado del análisis.

🎨 Estilo visual:
- Estética profesional, confiable y moderna.
- Paleta de colores: Azul marino (#001F54), blanco puro (#FFFFFF) y verde acento (#00C853).
- Tipografía sans-serif moderna (por ejemplo, Inter, Poppins o similar).
- Diseño completamente responsive (adaptado a móviles y escritorio).
- Iconos limpios y minimalistas si se usan.

🚀 Extras opcionales:
- Animaciones suaves en botones y formularios.
- Mensaje de carga tipo "Subiendo tu póliza..." mientras se envía.
- Mostrar aviso de éxito: "¡Tu póliza fue enviada correctamente! Pronto podrás chatear con tu IA."

---
  