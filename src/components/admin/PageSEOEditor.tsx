/**
 * Page SEO Editor Component - Manage SEO for all pages
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 */

import { useState, useEffect } from 'react';
import { usePageSEO, PageSEO } from '@/hooks/usePageSEO';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Save,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  FileText,
  Globe,
  Eye,
  EyeOff,
  Loader2,
  ExternalLink,
} from 'lucide-react';

const schemaTypes = [
  'WebPage',
  'WebSite',
  'AboutPage',
  'ContactPage',
  'FAQPage',
  'CollectionPage',
  'ItemPage',
  'ProfilePage',
  'SearchResultsPage',
  'WebApplication',
  'Article',
  'BlogPosting',
  'Product',
];

const PageSEOEditor = () => {
  const { allPages, isLoading, updatePageSEO, createPage, deletePage, refetch } = usePageSEO();
  const [expandedPage, setExpandedPage] = useState<string | null>(null);
  const [editData, setEditData] = useState<Record<string, Partial<PageSEO>>>({});
  const [saving, setSaving] = useState<string | null>(null);
  const [newRoute, setNewRoute] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    if (allPages.length > 0) {
      const data: Record<string, Partial<PageSEO>> = {};
      allPages.forEach((page) => {
        data[page.route] = { ...page };
      });
      setEditData(data);
    }
  }, [allPages]);

  const handleSave = async (route: string) => {
    setSaving(route);
    try {
      const success = await updatePageSEO(route, editData[route]);
      if (success) {
        toast.success(`SEO per "${route}" salvato!`);
      } else {
        toast.error('Errore nel salvataggio');
      }
    } catch (error) {
      toast.error('Errore nel salvataggio');
    } finally {
      setSaving(null);
    }
  };

  const handleAddPage = async () => {
    if (!newRoute) {
      toast.error('Inserisci una route');
      return;
    }

    const route = newRoute.startsWith('/') ? newRoute : `/${newRoute}`;
    const success = await createPage(route);
    
    if (success) {
      toast.success(`Pagina "${route}" aggiunta!`);
      setNewRoute('');
      setShowAddForm(false);
    } else {
      toast.error('Errore nella creazione');
    }
  };

  const handleDelete = async (route: string) => {
    if (!confirm(`Eliminare SEO per "${route}"?`)) return;
    
    const success = await deletePage(route);
    if (success) {
      toast.success(`SEO per "${route}" eliminato!`);
    } else {
      toast.error('Errore nell\'eliminazione');
    }
  };

  const updateField = (route: string, field: keyof PageSEO, value: any) => {
    setEditData((prev) => ({
      ...prev,
      [route]: {
        ...prev[route],
        [field]: value,
      },
    }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-foreground">SEO Pagine</h3>
          <p className="text-sm text-muted-foreground">
            Gestisci meta tags e SEO per ogni pagina del sito
          </p>
        </div>
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          variant="outline"
        >
          <Plus className="w-4 h-4 mr-2" />
          Aggiungi Pagina
        </Button>
      </div>

      {/* Add Page Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="card-glass p-4 rounded-xl"
          >
            <div className="flex gap-3">
              <Input
                value={newRoute}
                onChange={(e) => setNewRoute(e.target.value)}
                placeholder="/nuova-pagina"
                className="flex-1"
              />
              <Button onClick={handleAddPage} className="gradient-button">
                Aggiungi
              </Button>
              <Button variant="ghost" onClick={() => setShowAddForm(false)}>
                Annulla
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pages List */}
      <div className="space-y-3">
        {allPages.map((page) => (
          <motion.div
            key={page.route}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-glass rounded-xl overflow-hidden"
          >
            {/* Header */}
            <button
              onClick={() => setExpandedPage(expandedPage === page.route ? null : page.route)}
              className="w-full p-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-foreground">{page.route}</p>
                  <p className="text-sm text-muted-foreground">
                    {editData[page.route]?.title || 'Nessun titolo'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {page.noindex && (
                  <span className="text-xs px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-500">
                    noindex
                  </span>
                )}
                {expandedPage === page.route ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
            </button>

            {/* Expanded Content */}
            <AnimatePresence>
              {expandedPage === page.route && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-border"
                >
                  <div className="p-4 space-y-4">
                    {/* Basic SEO */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Titolo Pagina</Label>
                        <Input
                          value={editData[page.route]?.title || ''}
                          onChange={(e) => updateField(page.route, 'title', e.target.value)}
                          placeholder="Titolo della pagina"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Schema Type</Label>
                        <select
                          value={editData[page.route]?.schema_type || 'WebPage'}
                          onChange={(e) => updateField(page.route, 'schema_type', e.target.value)}
                          className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                        >
                          {schemaTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Meta Description</Label>
                      <Textarea
                        value={editData[page.route]?.description || ''}
                        onChange={(e) => updateField(page.route, 'description', e.target.value)}
                        placeholder="Descrizione per i motori di ricerca (max 160 caratteri)"
                        maxLength={160}
                      />
                      <p className="text-xs text-muted-foreground">
                        {(editData[page.route]?.description || '').length}/160
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label>Keywords</Label>
                      <Input
                        value={editData[page.route]?.keywords || ''}
                        onChange={(e) => updateField(page.route, 'keywords', e.target.value)}
                        placeholder="parola1, parola2, parola3"
                      />
                    </div>

                    {/* Open Graph */}
                    <div className="pt-4 border-t border-border">
                      <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        Open Graph (Social)
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>OG Title</Label>
                          <Input
                            value={editData[page.route]?.og_title || ''}
                            onChange={(e) => updateField(page.route, 'og_title', e.target.value)}
                            placeholder="Titolo per social (lascia vuoto per usare il titolo)"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>OG Image URL</Label>
                          <Input
                            value={editData[page.route]?.og_image || ''}
                            onChange={(e) => updateField(page.route, 'og_image', e.target.value)}
                            placeholder="https://..."
                          />
                        </div>
                      </div>
                      <div className="space-y-2 mt-4">
                        <Label>OG Description</Label>
                        <Textarea
                          value={editData[page.route]?.og_description || ''}
                          onChange={(e) => updateField(page.route, 'og_description', e.target.value)}
                          placeholder="Descrizione per social"
                          rows={2}
                        />
                      </div>
                    </div>

                    {/* Advanced */}
                    <div className="pt-4 border-t border-border">
                      <h4 className="font-medium text-foreground mb-3">Avanzate</h4>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Canonical URL</Label>
                          <Input
                            value={editData[page.route]?.canonical_url || ''}
                            onChange={(e) => updateField(page.route, 'canonical_url', e.target.value)}
                            placeholder="https://tuosito.com/pagina"
                          />
                        </div>

                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={editData[page.route]?.noindex || false}
                              onCheckedChange={(checked) => updateField(page.route, 'noindex', checked)}
                            />
                            <Label className="flex items-center gap-1">
                              <EyeOff className="w-4 h-4" />
                              noindex
                            </Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={editData[page.route]?.nofollow || false}
                              onCheckedChange={(checked) => updateField(page.route, 'nofollow', checked)}
                            />
                            <Label>nofollow</Label>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 border-t border-border flex items-center justify-between">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                        >
                          <a href={page.route} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Visualizza
                          </a>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(page.route)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Elimina
                        </Button>
                      </div>
                      <Button
                        onClick={() => handleSave(page.route)}
                        disabled={saving === page.route}
                        className="gradient-button"
                      >
                        {saving === page.route ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <Save className="w-4 h-4 mr-2" />
                        )}
                        Salva
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {allPages.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          Nessuna pagina configurata. Aggiungi la prima pagina!
        </div>
      )}
    </div>
  );
};

export default PageSEOEditor;
