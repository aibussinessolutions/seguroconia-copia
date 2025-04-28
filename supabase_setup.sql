-- Enable the uuid-ossp extension if it's not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the 'usuarios' table
CREATE TABLE usuarios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id),
    nombre TEXT,
    email TEXT,
    created_at TIMESTAMP DEFAULT now()
);

-- Enable RLS for 'usuarios'
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for 'usuarios'
CREATE POLICY usuarios_policy ON usuarios
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Create the 'polizas' table
CREATE TABLE polizas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id),
    numero_poliza TEXT,
    documento_id TEXT,
    fecha_efecto DATE,
    fecha_vencimiento DATE,
    email TEXT,
    created_at TIMESTAMP DEFAULT now()
);

-- Enable RLS for 'polizas'
ALTER TABLE polizas ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for 'polizas'
CREATE POLICY polizas_policy ON polizas
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);