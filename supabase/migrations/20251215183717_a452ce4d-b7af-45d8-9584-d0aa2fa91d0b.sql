-- Update password for admin user
UPDATE auth.users 
SET encrypted_password = crypt('123123123!', gen_salt('bf'))
WHERE email = 'eduard@studiojem.it';