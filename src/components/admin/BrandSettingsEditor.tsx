/**
 * Brand Settings Editor Component
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 */

import { useState, useRef } from 'react';
import { useBrandSettings } from '@/hooks/useBrandSettings';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import {
  Save,
  Upload,
  Image,
  Palette,
  Globe,
  Twitter,
  Loader2,
  X,
} from 'lucide-react';

const BrandSettingsEditor = () => {
  const { settings, isLoading, updateSetting, uploadAsset, refetch } = useBrandSettings();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState(settings);
  const [uploading, setUploading] = useState<string | null>(null);
  
  const faviconRef = useRef<HTMLInputElement>(null);
  const logoRef = useRef<HTMLInputElement>(null);
  const ogImageRef = useRef<HTMLInputElement>(null);

  // Update formData when settings load
  useState(() => {
    if (!isLoading) {
      setFormData(settings);
    }
  });

  const handleSave = async () => {
    setSaving(true);
    try {
      const updates = Object.entries(formData).map(([key, value]) =>
        updateSetting(key, value as string | null)
      );
      
      await Promise.all(updates);
      toast.success('Impostazioni salvate!');
      await refetch();
    } catch (error) {
      toast.error('Errore nel salvataggio');
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'favicon' | 'logo' | 'og_image'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Seleziona un file immagine valido');
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error('File troppo grande (max 2MB)');
      return;
    }

    setUploading(type);
    try {
      const url = await uploadAsset(file, type);
      if (url) {
        const key = `${type}_url`;
        setFormData((prev) => ({ ...prev, [key]: url }));
        await updateSetting(key, url);
        toast.success('Immagine caricata!');
      }
    } catch (error) {
      toast.error('Errore nel caricamento');
    } finally {
      setUploading(null);
    }
  };

  const handleRemoveImage = async (type: 'favicon' | 'logo' | 'og_image') => {
    const key = `${type}_url`;
    setFormData((prev) => ({ ...prev, [key]: null }));
    await updateSetting(key, null);
    toast.success('Immagine rimossa');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* SEO Settings */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-glass p-6 rounded-2xl"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
            <Globe className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-foreground">SEO & Meta Tags</h3>
            <p className="text-sm text-muted-foreground">
              Ottimizza la visibilità sui motori di ricerca
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="space-y-2">
            <Label>Titolo Sito</Label>
            <Input
              value={formData.site_title || ''}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, site_title: e.target.value }))
              }
              placeholder="Nome del tuo sito"
            />
          </div>

          <div className="space-y-2">
            <Label>Meta Description</Label>
            <Textarea
              value={formData.site_description || ''}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, site_description: e.target.value }))
              }
              placeholder="Descrizione per i motori di ricerca"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label>Keywords</Label>
            <Input
              value={formData.meta_keywords || ''}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, meta_keywords: e.target.value }))
              }
              placeholder="parola1, parola2, parola3"
            />
          </div>
        </div>
      </motion.div>

      {/* Social Sharing */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card-glass p-6 rounded-2xl"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
            <Twitter className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-foreground">Social Sharing</h3>
            <p className="text-sm text-muted-foreground">
              Come appare quando condividi il sito
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="space-y-2">
            <Label>Titolo OG (Open Graph)</Label>
            <Input
              value={formData.og_title || ''}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, og_title: e.target.value }))
              }
              placeholder="Titolo per social"
            />
          </div>

          <div className="space-y-2">
            <Label>Descrizione OG</Label>
            <Textarea
              value={formData.og_description || ''}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, og_description: e.target.value }))
              }
              placeholder="Descrizione per social"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label>Twitter Handle</Label>
            <Input
              value={formData.twitter_handle || ''}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, twitter_handle: e.target.value }))
              }
              placeholder="@tuohandle"
            />
          </div>
        </div>
      </motion.div>

      {/* Brand Assets */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card-glass p-6 rounded-2xl"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center">
            <Image className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-foreground">Immagini Brand</h3>
            <p className="text-sm text-muted-foreground">
              Logo, favicon e immagine di condivisione
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Favicon */}
          <div className="space-y-3">
            <Label>Favicon</Label>
            <div className="relative">
              {formData.favicon_url ? (
                <div className="relative w-20 h-20 rounded-xl border border-border overflow-hidden bg-card">
                  <img
                    src={formData.favicon_url}
                    alt="Favicon"
                    className="w-full h-full object-contain"
                  />
                  <button
                    onClick={() => handleRemoveImage('favicon')}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => faviconRef.current?.click()}
                  disabled={uploading === 'favicon'}
                  className="w-20 h-20 rounded-xl border-2 border-dashed border-border hover:border-primary flex items-center justify-center transition-colors"
                >
                  {uploading === 'favicon' ? (
                    <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                  ) : (
                    <Upload className="w-6 h-6 text-muted-foreground" />
                  )}
                </button>
              )}
              <input
                ref={faviconRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileUpload(e, 'favicon')}
              />
            </div>
            <p className="text-xs text-muted-foreground">32x32 o 64x64 px</p>
          </div>

          {/* Logo */}
          <div className="space-y-3">
            <Label>Logo</Label>
            <div className="relative">
              {formData.logo_url ? (
                <div className="relative w-full h-20 rounded-xl border border-border overflow-hidden bg-card">
                  <img
                    src={formData.logo_url}
                    alt="Logo"
                    className="w-full h-full object-contain"
                  />
                  <button
                    onClick={() => handleRemoveImage('logo')}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => logoRef.current?.click()}
                  disabled={uploading === 'logo'}
                  className="w-full h-20 rounded-xl border-2 border-dashed border-border hover:border-primary flex items-center justify-center transition-colors"
                >
                  {uploading === 'logo' ? (
                    <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                  ) : (
                    <Upload className="w-6 h-6 text-muted-foreground" />
                  )}
                </button>
              )}
              <input
                ref={logoRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileUpload(e, 'logo')}
              />
            </div>
            <p className="text-xs text-muted-foreground">PNG o SVG trasparente</p>
          </div>

          {/* OG Image */}
          <div className="space-y-3">
            <Label>Immagine Social</Label>
            <div className="relative">
              {formData.og_image_url ? (
                <div className="relative w-full h-20 rounded-xl border border-border overflow-hidden bg-card">
                  <img
                    src={formData.og_image_url}
                    alt="OG Image"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => handleRemoveImage('og_image')}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => ogImageRef.current?.click()}
                  disabled={uploading === 'og_image'}
                  className="w-full h-20 rounded-xl border-2 border-dashed border-border hover:border-primary flex items-center justify-center transition-colors"
                >
                  {uploading === 'og_image' ? (
                    <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                  ) : (
                    <Upload className="w-6 h-6 text-muted-foreground" />
                  )}
                </button>
              )}
              <input
                ref={ogImageRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileUpload(e, 'og_image')}
              />
            </div>
            <p className="text-xs text-muted-foreground">1200x630 px raccomandato</p>
          </div>
        </div>
      </motion.div>

      {/* Brand Colors */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card-glass p-6 rounded-2xl"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
            <Palette className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-foreground">Colori Brand</h3>
            <p className="text-sm text-muted-foreground">
              Personalizza i colori del tuo brand
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label>Colore Primario</Label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={formData.brand_primary_color || '#8B5CF6'}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    brand_primary_color: e.target.value,
                  }))
                }
                className="w-12 h-12 rounded-xl border border-border cursor-pointer"
              />
              <Input
                value={formData.brand_primary_color || '#8B5CF6'}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    brand_primary_color: e.target.value,
                  }))
                }
                className="flex-1"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label>Colore Secondario</Label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={formData.brand_secondary_color || '#EC4899'}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    brand_secondary_color: e.target.value,
                  }))
                }
                className="w-12 h-12 rounded-xl border border-border cursor-pointer"
              />
              <Input
                value={formData.brand_secondary_color || '#EC4899'}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    brand_secondary_color: e.target.value,
                  }))
                }
                className="flex-1"
              />
            </div>
          </div>
        </div>
      </motion.div>

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
          Salva Tutto
        </Button>
      </div>
    </div>
  );
};

export default BrandSettingsEditor;
