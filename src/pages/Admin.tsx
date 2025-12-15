/**
 * Admin Dashboard - Landing Page CMS
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '@/hooks/useAdmin';
import { useLandingContent } from '@/hooks/useLandingContent';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { 
  LogOut, 
  Save, 
  Sparkles, 
  LayoutGrid, 
  CreditCard, 
  HelpCircle, 
  MessageSquare,
  Loader2,
  Palette,
  Search,
  FileText
} from 'lucide-react';
import BrandSettingsEditor from '@/components/admin/BrandSettingsEditor';
import SEOSettingsEditor from '@/components/admin/SEOSettingsEditor';
import PageSEOEditor from '@/components/admin/PageSEOEditor';

const Admin = () => {
  const navigate = useNavigate();
  const { user, isAdmin, isLoading: authLoading, signOut } = useAdmin();
  const { content, isLoading: contentLoading, updateContent, refetch } = useLandingContent();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Record<string, Record<string, any>>>({});

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      navigate('/admin/login');
    }
  }, [authLoading, isAdmin, navigate]);

  useEffect(() => {
    if (content && Object.keys(content).length > 0) {
      setFormData(content);
    }
  }, [content]);

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const handleSave = async (section: string) => {
    setSaving(true);
    try {
      const sectionData = formData[section] || {};
      
      for (const [key, value] of Object.entries(sectionData)) {
        const success = await updateContent(section, key, value);
        if (!success) {
          throw new Error(`Failed to save ${key}`);
        }
      }
      
      toast.success(`Sezione "${section}" salvata!`);
      await refetch();
    } catch (error: any) {
      toast.error(`Errore: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const updateFormData = (section: string, key: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  if (authLoading || contentLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  const sections = [
    { id: 'brand', label: 'Brand', icon: Palette },
    { id: 'seo', label: 'SEO Globale', icon: Search },
    { id: 'pages', label: 'SEO Pagine', icon: FileText },
    { id: 'hero', label: 'Hero', icon: Sparkles },
    { id: 'features', label: 'Features', icon: LayoutGrid },
    { id: 'pricing', label: 'Pricing', icon: CreditCard },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Esci
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="brand" className="space-y-6">
          <TabsList className="bg-card border border-border flex-wrap">
            {sections.map((section) => (
              <TabsTrigger 
                key={section.id} 
                value={section.id}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <section.icon className="w-4 h-4 mr-2" />
                {section.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Brand Section */}
          <TabsContent value="brand">
            <BrandSettingsEditor />
          </TabsContent>

          {/* SEO Section */}
          <TabsContent value="seo">
            <SEOSettingsEditor />
          </TabsContent>

          {/* Pages SEO Section */}
          <TabsContent value="pages">
            <PageSEOEditor />
          </TabsContent>

          {/* Hero Section */}
          <TabsContent value="hero">
            <ContentEditor
              section="hero"
              title="Hero Section"
              fields={[
                { key: 'badge', label: 'Badge', type: 'text', placeholder: 'Es: 🚀 Lancio 2024' },
                { key: 'title', label: 'Titolo', type: 'text', placeholder: 'Es: La nuova era dei menu digitali' },
                { key: 'subtitle', label: 'Sottotitolo', type: 'textarea', placeholder: 'Descrizione hero' },
                { key: 'cta_primary', label: 'CTA Primaria', type: 'text', placeholder: 'Es: Inizia Gratis' },
                { key: 'cta_secondary', label: 'CTA Secondaria', type: 'text', placeholder: 'Es: Guarda Demo' },
              ]}
              formData={formData}
              updateFormData={updateFormData}
              onSave={handleSave}
              saving={saving}
            />
          </TabsContent>

          {/* Features Section */}
          <TabsContent value="features">
            <ContentEditor
              section="features"
              title="Features Section"
              fields={[
                { key: 'title', label: 'Titolo Sezione', type: 'text', placeholder: 'Es: Tutto ciò che ti serve' },
                { key: 'subtitle', label: 'Sottotitolo', type: 'textarea', placeholder: 'Descrizione features' },
              ]}
              formData={formData}
              updateFormData={updateFormData}
              onSave={handleSave}
              saving={saving}
            />
          </TabsContent>

          {/* Pricing Section */}
          <TabsContent value="pricing">
            <ContentEditor
              section="pricing"
              title="Pricing Section"
              fields={[
                { key: 'title', label: 'Titolo Sezione', type: 'text', placeholder: 'Es: Prezzi semplici' },
                { key: 'subtitle', label: 'Sottotitolo', type: 'textarea', placeholder: 'Descrizione pricing' },
              ]}
              formData={formData}
              updateFormData={updateFormData}
              onSave={handleSave}
              saving={saving}
            />
          </TabsContent>

          {/* FAQ Section */}
          <TabsContent value="faq">
            <ContentEditor
              section="faq"
              title="FAQ Section"
              fields={[
                { key: 'title', label: 'Titolo Sezione', type: 'text', placeholder: 'Es: Domande Frequenti' },
              ]}
              formData={formData}
              updateFormData={updateFormData}
              onSave={handleSave}
              saving={saving}
            />
          </TabsContent>

          {/* Testimonials Section */}
          <TabsContent value="testimonials">
            <ContentEditor
              section="testimonials"
              title="Testimonials Section"
              fields={[
                { key: 'title', label: 'Titolo Sezione', type: 'text', placeholder: 'Es: Cosa dicono i clienti' },
                { key: 'subtitle', label: 'Sottotitolo', type: 'textarea', placeholder: 'Descrizione testimonials' },
              ]}
              formData={formData}
              updateFormData={updateFormData}
              onSave={handleSave}
              saving={saving}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

interface ContentEditorProps {
  section: string;
  title: string;
  fields: Array<{
    key: string;
    label: string;
    type: 'text' | 'textarea';
    placeholder?: string;
  }>;
  formData: Record<string, Record<string, any>>;
  updateFormData: (section: string, key: string, value: any) => void;
  onSave: (section: string) => void;
  saving: boolean;
}

const ContentEditor = ({
  section,
  title,
  fields,
  formData,
  updateFormData,
  onSave,
  saving
}: ContentEditorProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-glass p-6 rounded-2xl"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">{title}</h2>
        <Button 
          onClick={() => onSave(section)} 
          disabled={saving}
          className="gradient-button"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          Salva
        </Button>
      </div>

      <div className="space-y-4">
        {fields.map((field) => (
          <div key={field.key} className="space-y-2">
            <Label htmlFor={`${section}-${field.key}`}>{field.label}</Label>
            {field.type === 'textarea' ? (
              <Textarea
                id={`${section}-${field.key}`}
                value={formData[section]?.[field.key] || ''}
                onChange={(e) => updateFormData(section, field.key, e.target.value)}
                placeholder={field.placeholder}
                rows={3}
              />
            ) : (
              <Input
                id={`${section}-${field.key}`}
                value={formData[section]?.[field.key] || ''}
                onChange={(e) => updateFormData(section, field.key, e.target.value)}
                placeholder={field.placeholder}
              />
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Admin;
