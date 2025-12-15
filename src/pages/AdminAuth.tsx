/**
 * Admin Authentication Page
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Eye, EyeOff, Lock, Mail, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

type AuthMode = 'login' | 'signup' | 'forgot' | 'reset';

const AdminAuth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<AuthMode>('login');
  const navigate = useNavigate();

  useEffect(() => {
    // Check for password reset token in URL
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const type = hashParams.get('type');
    if (type === 'recovery') {
      setMode('reset');
    }
  }, []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'PASSWORD_RECOVERY') {
          setMode('reset');
          return;
        }
        
        if (session?.user && mode !== 'reset') {
          const { data: roles } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', session.user.id)
            .eq('role', 'admin')
            .maybeSingle();

          if (roles) {
            navigate('/admin');
          }
        }
      }
    );

    // Check existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user && mode !== 'reset') {
        const { data: roles } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', session.user.id)
          .eq('role', 'admin')
          .maybeSingle();

        if (roles) {
          navigate('/admin');
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, mode]);

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;

    const { data: roles } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', data.user.id)
      .eq('role', 'admin')
      .maybeSingle();

    if (!roles) {
      await supabase.auth.signOut();
      toast.error('Non hai i permessi di amministratore');
      return;
    }

    toast.success('Accesso effettuato!');
    navigate('/admin');
  };

  const handleSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/admin`
      }
    });

    if (error) throw error;

    if (data.user) {
      const { count } = await supabase
        .from('user_roles')
        .select('*', { count: 'exact', head: true });

      if (count === 0) {
        await supabase
          .from('user_roles')
          .insert({ user_id: data.user.id, role: 'admin' });
        
        toast.success('Account admin creato! Ora puoi accedere.');
        setMode('login');
      } else {
        toast.info('Registrazione completata. Contatta un admin per i permessi.');
      }
    }
  };

  const handleForgotPassword = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/login`
    });

    if (error) throw error;

    toast.success('Email di reset inviata! Controlla la tua casella.');
    setMode('login');
  };

  const handleResetPassword = async () => {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (error) throw error;

    toast.success('Password aggiornata con successo!');
    setMode('login');
    navigate('/admin/login');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'forgot' && !email) {
      toast.error('Inserisci la tua email');
      return;
    }
    
    if (mode === 'reset' && !newPassword) {
      toast.error('Inserisci la nuova password');
      return;
    }

    if ((mode === 'login' || mode === 'signup') && (!email || !password)) {
      toast.error('Inserisci email e password');
      return;
    }

    if (newPassword && newPassword.length < 6) {
      toast.error('La password deve avere almeno 6 caratteri');
      return;
    }

    setIsLoading(true);

    try {
      switch (mode) {
        case 'login':
          await handleLogin();
          break;
        case 'signup':
          await handleSignUp();
          break;
        case 'forgot':
          await handleForgotPassword();
          break;
        case 'reset':
          await handleResetPassword();
          break;
      }
    } catch (error: any) {
      if (error.message.includes('Invalid login credentials')) {
        toast.error('Email o password non validi');
      } else if (error.message.includes('User already registered')) {
        toast.error('Email già registrata');
      } else {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getTitle = () => {
    switch (mode) {
      case 'signup': return 'Crea Account Admin';
      case 'forgot': return 'Recupera Password';
      case 'reset': return 'Nuova Password';
      default: return 'Admin Login';
    }
  };

  const getSubtitle = () => {
    switch (mode) {
      case 'signup': return 'Registrati per gestire i contenuti';
      case 'forgot': return 'Inserisci la tua email per ricevere il link di reset';
      case 'reset': return 'Inserisci la tua nuova password';
      default: return 'Accedi per gestire i contenuti';
    }
  };

  const getButtonText = () => {
    switch (mode) {
      case 'signup': return 'Registrati';
      case 'forgot': return 'Invia Email';
      case 'reset': return 'Aggiorna Password';
      default: return 'Accedi';
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="card-glass p-8 rounded-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">{getTitle()}</h1>
            <p className="text-muted-foreground mt-2">{getSubtitle()}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode !== 'reset' && (
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            )}

            {(mode === 'login' || mode === 'signup') && (
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {mode === 'reset' && (
              <div className="space-y-2">
                <Label htmlFor="newPassword">Nuova Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="newPassword"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            <Button
              type="submit"
              className="w-full gradient-button"
              disabled={isLoading}
            >
              {isLoading ? 'Caricamento...' : getButtonText()}
            </Button>
          </form>

          <div className="mt-6 space-y-3 text-center">
            {mode === 'login' && (
              <>
                <button
                  type="button"
                  onClick={() => setMode('forgot')}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors block w-full"
                >
                  Password dimenticata?
                </button>
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Primo accesso? Crea account
                </button>
              </>
            )}
            
            {mode === 'signup' && (
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-2 w-full"
              >
                <ArrowLeft className="w-4 h-4" />
                Torna al login
              </button>
            )}
            
            {(mode === 'forgot' || mode === 'reset') && (
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-2 w-full"
              >
                <ArrowLeft className="w-4 h-4" />
                Torna al login
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminAuth;
