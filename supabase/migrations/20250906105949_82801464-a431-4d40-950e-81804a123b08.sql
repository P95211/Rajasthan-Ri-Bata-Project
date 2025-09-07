-- Drop the existing overly permissive vault policy
DROP POLICY IF EXISTS "Authenticated users can manage vault" ON vault;

-- Create secure policies that only allow admin users to access vault
CREATE POLICY "Only admins can view vault secrets" 
ON vault 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can insert vault secrets" 
ON vault 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can update vault secrets" 
ON vault 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can delete vault secrets" 
ON vault 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));