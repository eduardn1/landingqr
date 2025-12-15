/**
 * Full SEO Settings Editor Component
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 */

import { useState, useEffect } from 'react';
import { useBrandSettings } from '@/hooks/useBrandSettings';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import {
  Save,
  Globe,
  Search,
  Share2,
  Code,
  BarChart3,
  FileText,
  RefreshCw,
  Send,
  CheckCircle,
  XCircle,
  Clock,
  Loader2,
  ExternalLink,
} from 'lucide-react';

const SEOSettingsEditor = () => {
  const { settings, isLoading, updateSetting, refetch } = useBrandSettings();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState(settings);
  const [generatingSitemap, setGeneratingSitemap] = useState(false);
  const [requestingIndex, setRequestingIndex] = useState(false);
  const [indexUrl, setIndexUrl] = useState('');

  useEffect(() => {
    if (!isLoading) {
      setFormData(settings);
    }
  }, [settings, isLoading]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const updates = Object.entries(formData).map(([key, value]) =>
        updateSetting(key, value as string | null)
      );
      await Promise.all(updates);
      toast.success('Impostazioni SEO salvate!');
      await refetch();
    } catch (error) {
      toast.error('Errore nel salvataggio');
    } finally {
      setSaving(false);
    }
  };

  const handleGenerateSitemap = async () => {
    setGeneratingSitemap(true);
    try {
      const baseUrl = window.location.origin;
      const { data, error } = await supabase.functions.invoke('generate-sitemap', {
        body: { baseUrl, format: 'json' },
      });

      if (error) throw error;

      toast.success(`Sitemap generata con ${data.pages?.length || 0} pagine!`);
      await refetch();
    } catch (error: any) {
      toast.error(`Errore: ${error.message}`);
    } finally {
      setGeneratingSitemap(false);
    }
  };

  const handleRequestIndexing = async () => {
    if (!indexUrl) {
      toast.error('Inserisci un URL da indicizzare');
      return;
    }

    setRequestingIndex(true);
    try {
      const { data, error } = await supabase.functions.invoke('request-indexing', {
        body: { url: indexUrl, action: 'URL_UPDATED' },
      });

      if (error) throw error;

      toast.success(data.message);
      setIndexUrl('');
      await refetch();
    } catch (error: any) {
      toast.error(`Errore: ${error.message}`);
    } finally {
      setRequestingIndex(false);
    }
  };

  const indexedPages = formData.indexed_pages
    ? JSON.parse(formData.indexed_pages as string)
    : [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="meta" className="space-y-6">
        <TabsList className="bg-card border border-border flex-wrap">
          <TabsTrigger value="meta" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Globe className="w-4 h-4 mr-2" />
            Meta Tags
          </TabsTrigger>
          <TabsTrigger value="schema" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Code className="w-4 h-4 mr-2" />
            Schema.org
          </TabsTrigger>
          <TabsTrigger value="social" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Share2 className="w-4 h-4 mr-2" />
            Social
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="indexing" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Search className="w-4 h-4 mr-2" />
            Indexing
          </TabsTrigger>
          <TabsTrigger value="robots" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <FileText className="w-4 h-4 mr-2" />
            Robots & Sitemap
          </TabsTrigger>
        </TabsList>

        {/* Meta Tags */}
        <TabsContent value="meta">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-glass p-6 rounded-2xl space-y-4"
          >
            <h3 className="font-bold text-lg text-foreground mb-4">Meta Tags</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Titolo Sito</Label>
                <Input
                  value={formData.site_title || ''}
                  onChange={(e) => setFormData({ ...formData, site_title: e.target.value })}
                  placeholder="Nome del sito"
                />
              </div>
              <div className="space-y-2">
                <Label>URL Canonico</Label>
                <Input
                  value={formData.canonical_url || ''}
                  onChange={(e) => setFormData({ ...formData, canonical_url: e.target.value })}
                  placeholder="https://tuosito.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Meta Description (max 160 caratteri)</Label>
              <Textarea
                value={formData.site_description || ''}
                onChange={(e) => setFormData({ ...formData, site_description: e.target.value })}
                placeholder="Descrizione del sito per i motori di ricerca"
                maxLength={160}
              />
              <p className="text-xs text-muted-foreground">
                {(formData.site_description || '').length}/160 caratteri
              </p>
            </div>

            <div className="space-y-2">
              <Label>Keywords (separate da virgola)</Label>
              <Input
                value={formData.meta_keywords || ''}
                onChange={(e) => setFormData({ ...formData, meta_keywords: e.target.value })}
                placeholder="parola1, parola2, parola3"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Google Verification</Label>
                <Input
                  value={formData.google_site_verification || ''}
                  onChange={(e) => setFormData({ ...formData, google_site_verification: e.target.value })}
                  placeholder="Codice verifica Google"
                />
              </div>
              <div className="space-y-2">
                <Label>Bing Verification</Label>
                <Input
                  value={formData.bing_site_verification || ''}
                  onChange={(e) => setFormData({ ...formData, bing_site_verification: e.target.value })}
                  placeholder="Codice verifica Bing"
                />
              </div>
              <div className="space-y-2">
                <Label>Yandex Verification</Label>
                <Input
                  value={formData.yandex_verification || ''}
                  onChange={(e) => setFormData({ ...formData, yandex_verification: e.target.value })}
                  placeholder="Codice verifica Yandex"
                />
              </div>
            </div>
          </motion.div>
        </TabsContent>

        {/* Schema.org */}
        <TabsContent value="schema">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-glass p-6 rounded-2xl space-y-4"
          >
            <h3 className="font-bold text-lg text-foreground mb-4">Schema.org (Dati Strutturati)</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tipo Organizzazione</Label>
                <Input
                  value={formData.schema_org_type || ''}
                  onChange={(e) => setFormData({ ...formData, schema_org_type: e.target.value })}
                  placeholder="Organization, LocalBusiness, Restaurant"
                />
              </div>
              <div className="space-y-2">
                <Label>Nome Organizzazione</Label>
                <Input
                  value={formData.schema_org_name || ''}
                  onChange={(e) => setFormData({ ...formData, schema_org_name: e.target.value })}
                  placeholder="Nome azienda"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>URL Logo</Label>
              <Input
                value={formData.schema_org_logo || ''}
                onChange={(e) => setFormData({ ...formData, schema_org_logo: e.target.value })}
                placeholder="https://tuosito.com/logo.png"
              />
            </div>

            <div className="space-y-2">
              <Label>Indirizzo</Label>
              <Input
                value={formData.schema_org_address || ''}
                onChange={(e) => setFormData({ ...formData, schema_org_address: e.target.value })}
                placeholder="Via Roma 1, 00100 Roma, Italia"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Telefono</Label>
                <Input
                  value={formData.schema_org_phone || ''}
                  onChange={(e) => setFormData({ ...formData, schema_org_phone: e.target.value })}
                  placeholder="+39 123 456 7890"
                />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  value={formData.schema_org_email || ''}
                  onChange={(e) => setFormData({ ...formData, schema_org_email: e.target.value })}
                  placeholder="info@tuosito.com"
                />
              </div>
            </div>
          </motion.div>
        </TabsContent>

        {/* Social */}
        <TabsContent value="social">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-glass p-6 rounded-2xl space-y-4"
          >
            <h3 className="font-bold text-lg text-foreground mb-4">Social Media & Open Graph</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>OG Title</Label>
                <Input
                  value={formData.og_title || ''}
                  onChange={(e) => setFormData({ ...formData, og_title: e.target.value })}
                  placeholder="Titolo per condivisione social"
                />
              </div>
              <div className="space-y-2">
                <Label>Twitter Card Type</Label>
                <Input
                  value={formData.twitter_card_type || ''}
                  onChange={(e) => setFormData({ ...formData, twitter_card_type: e.target.value })}
                  placeholder="summary_large_image"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>OG Description</Label>
              <Textarea
                value={formData.og_description || ''}
                onChange={(e) => setFormData({ ...formData, og_description: e.target.value })}
                placeholder="Descrizione per condivisione social"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Twitter Handle</Label>
                <Input
                  value={formData.twitter_handle || ''}
                  onChange={(e) => setFormData({ ...formData, twitter_handle: e.target.value })}
                  placeholder="@tuohandle"
                />
              </div>
              <div className="space-y-2">
                <Label>Instagram Handle</Label>
                <Input
                  value={formData.instagram_handle || ''}
                  onChange={(e) => setFormData({ ...formData, instagram_handle: e.target.value })}
                  placeholder="@tuoinstagram"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>LinkedIn URL</Label>
                <Input
                  value={formData.linkedin_url || ''}
                  onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                  placeholder="https://linkedin.com/company/..."
                />
              </div>
              <div className="space-y-2">
                <Label>Facebook App ID</Label>
                <Input
                  value={formData.facebook_app_id || ''}
                  onChange={(e) => setFormData({ ...formData, facebook_app_id: e.target.value })}
                  placeholder="123456789"
                />
              </div>
            </div>
          </motion.div>
        </TabsContent>

        {/* Analytics */}
        <TabsContent value="analytics">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-glass p-6 rounded-2xl space-y-4"
          >
            <h3 className="font-bold text-lg text-foreground mb-4">Analytics & Tracking</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Google Analytics ID</Label>
                <Input
                  value={formData.google_analytics_id || ''}
                  onChange={(e) => setFormData({ ...formData, google_analytics_id: e.target.value })}
                  placeholder="G-XXXXXXXXXX"
                />
              </div>
              <div className="space-y-2">
                <Label>Facebook Pixel ID</Label>
                <Input
                  value={formData.facebook_pixel_id || ''}
                  onChange={(e) => setFormData({ ...formData, facebook_pixel_id: e.target.value })}
                  placeholder="123456789"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Hotjar ID</Label>
              <Input
                value={formData.hotjar_id || ''}
                onChange={(e) => setFormData({ ...formData, hotjar_id: e.target.value })}
                placeholder="1234567"
              />
            </div>

            <div className="p-4 bg-muted/50 rounded-xl">
              <p className="text-sm text-muted-foreground">
                <strong>Nota:</strong> Gli script di analytics verranno caricati solo se l'utente ha accettato i cookie di tracciamento.
              </p>
            </div>
          </motion.div>
        </TabsContent>

        {/* Indexing */}
        <TabsContent value="indexing">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="card-glass p-6 rounded-2xl space-y-4">
              <h3 className="font-bold text-lg text-foreground mb-4">Richiedi Indicizzazione</h3>
              
              <div className="flex gap-3">
                <Input
                  value={indexUrl}
                  onChange={(e) => setIndexUrl(e.target.value)}
                  placeholder="https://tuosito.com/pagina"
                  className="flex-1"
                />
                <Button
                  onClick={handleRequestIndexing}
                  disabled={requestingIndex}
                  className="gradient-button"
                >
                  {requestingIndex ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  <span className="ml-2">Indicizza</span>
                </Button>
              </div>

              <p className="text-xs text-muted-foreground">
                Invia una richiesta di indicizzazione a Google per una pagina specifica.
              </p>
            </div>

            <div className="card-glass p-6 rounded-2xl">
              <h3 className="font-bold text-lg text-foreground mb-4">Storico Richieste</h3>
              
              {indexedPages.length === 0 ? (
                <p className="text-muted-foreground text-sm">Nessuna richiesta di indicizzazione</p>
              ) : (
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {indexedPages.slice(0, 10).map((page: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        {page.status === 'submitted' && <CheckCircle className="w-4 h-4 text-green-500" />}
                        {page.status === 'failed' && <XCircle className="w-4 h-4 text-red-500" />}
                        {page.status === 'pending' && <Clock className="w-4 h-4 text-yellow-500" />}
                        {page.status === 'logged_only' && <Clock className="w-4 h-4 text-muted-foreground" />}
                        <div>
                          <p className="text-sm font-medium truncate max-w-xs">{page.url}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(page.requestedAt).toLocaleString('it-IT')}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs px-2 py-1 rounded-full bg-muted">
                        {page.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </TabsContent>

        {/* Robots & Sitemap */}
        <TabsContent value="robots">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="card-glass p-6 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg text-foreground">Sitemap</h3>
                <Button
                  onClick={handleGenerateSitemap}
                  disabled={generatingSitemap}
                  variant="outline"
                >
                  {generatingSitemap ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <RefreshCw className="w-4 h-4 mr-2" />
                  )}
                  Genera Sitemap
                </Button>
              </div>

              {formData.last_sitemap_update && (
                <p className="text-sm text-muted-foreground">
                  Ultimo aggiornamento: {new Date(formData.last_sitemap_update).toLocaleString('it-IT')}
                </p>
              )}

              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <a
                    href={`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-sitemap?baseUrl=${window.location.origin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Vedi Sitemap XML
                  </a>
                </Button>
              </div>
            </div>

            <div className="card-glass p-6 rounded-2xl space-y-4">
              <h3 className="font-bold text-lg text-foreground">Robots.txt</h3>
              
              <Textarea
                value={formData.robots_txt || ''}
                onChange={(e) => setFormData({ ...formData, robots_txt: e.target.value })}
                placeholder="User-agent: *&#10;Allow: /"
                rows={12}
                className="font-mono text-sm"
              />

              <Button variant="outline" size="sm" asChild>
                <a
                  href={`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/robots-txt`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Vedi Robots.txt
                </a>
              </Button>
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={saving}
          className="gradient-button"
          size="lg"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          Salva Impostazioni SEO
        </Button>
      </div>
    </div>
  );
};

export default SEOSettingsEditor;
