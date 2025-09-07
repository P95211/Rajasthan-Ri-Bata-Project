-- Add delete policies for documents table
CREATE POLICY "Admins can delete documents" 
ON public.documents 
FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'::app_role
  )
);

-- Add delete policies for videos table  
CREATE POLICY "Admins can delete videos" 
ON public.videos 
FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'::app_role
  )
);