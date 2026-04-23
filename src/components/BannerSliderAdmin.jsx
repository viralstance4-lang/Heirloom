import { useState, useRef, useCallback } from 'react';
import BannerSlider from './BannerSlider';

const STORAGE_KEY = 'heirloom_banner_slides';

/* ── helpers ── */
function readFileAsDataURL(file) {
  return new Promise(resolve => {
    const r = new FileReader();
    r.onload = e => resolve(e.target.result);
    r.readAsDataURL(file);
  });
}

function loadStored(fallback) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function persist(slides) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(slides));
}

const EMPTY_FORM = { desktopImage: '', mobileImage: '', link: '' };

/* ── sub-components ── */
function Field({ label, required, error, children }) {
  return (
    <div className="mb-5">
      <label className="block text-[11px] font-sans font-medium tracking-luxury uppercase text-luxury mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

function ImageField({ label, required, error, value, fileRef, onFile, onClear, urlKey, onUrl }) {
  return (
    <Field label={label} required={required} error={error}>
      {value ? (
        <div className="relative group mb-2">
          <img src={value} alt={label} className="w-full h-36 object-cover rounded border border-cream-deeper" />
          <button
            type="button"
            onClick={onClear}
            className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white flex items-center justify-center rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity"
          >
            ×
          </button>
        </div>
      ) : null}

      {/* File upload */}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={onFile}
        className="w-full text-xs text-luxury-muted
          file:mr-3 file:py-2 file:px-4 file:border-0
          file:text-[11px] file:font-sans file:tracking-luxury file:uppercase
          file:bg-brand file:text-cream hover:file:bg-brand-light file:cursor-pointer
          file:transition-colors file:duration-200"
      />

      {/* OR URL input */}
      <div className="flex items-center gap-2 mt-2">
        <span className="text-[10px] text-luxury-muted font-sans uppercase tracking-wider">or URL:</span>
        <input
          type="text"
          placeholder="https://... or /public/image.jpg"
          value={value && !value.startsWith('data:') ? value : ''}
          onChange={e => onUrl(e.target.value)}
          className="flex-1 border border-cream-deeper px-3 py-1.5 text-xs font-sans text-luxury focus:outline-none focus:border-gold"
        />
      </div>
    </Field>
  );
}

/* ── main admin component ── */
export default function BannerSliderAdmin({ defaultSlides = [] }) {
  const [slides,   setSlides]   = useState(() => loadStored(defaultSlides));
  const [form,     setForm]     = useState(EMPTY_FORM);
  const [editId,   setEditId]   = useState(null);
  const [errors,   setErrors]   = useState({});
  const [preview,  setPreview]  = useState(false);
  const [saved,    setSaved]    = useState(false);
  const desktopRef = useRef();
  const mobileRef  = useRef();

  const updateSlides = useCallback(updated => {
    setSlides(updated);
    persist(updated);
  }, []);

  const handleFile = async (e, field) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await readFileAsDataURL(file);
    setForm(f => ({ ...f, [field]: url }));
    setErrors(er => ({ ...er, [field]: '' }));
  };

  const handleUrl = (value, field) => {
    setForm(f => ({ ...f, [field]: value }));
    setErrors(er => ({ ...er, [field]: '' }));
  };

  const clearField = (field, ref) => {
    setForm(f => ({ ...f, [field]: '' }));
    if (ref.current) ref.current.value = '';
  };

  const validate = () => {
    const e = {};
    if (!form.desktopImage?.trim()) e.desktopImage = 'Desktop image is required.';
    if (!form.link?.trim())         e.link          = 'Redirect link is required.';
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const slide = {
      id:            editId ?? Date.now(),
      desktopImage:  form.desktopImage.trim(),
      mobileImage:   form.mobileImage.trim() || form.desktopImage.trim(),
      link:          form.link.trim(),
    };

    const updated = editId
      ? slides.map(s => s.id === editId ? slide : s)
      : [...slides, slide];

    updateSlides(updated);
    resetForm();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleEdit = (slide) => {
    setEditId(slide.id);
    setForm({
      desktopImage: slide.desktopImage,
      mobileImage:  slide.mobileImage === slide.desktopImage ? '' : slide.mobileImage,
      link:         slide.link,
    });
    setErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (!window.confirm('Delete this slide?')) return;
    updateSlides(slides.filter(s => s.id !== id));
    if (editId === id) resetForm();
  };

  const handleMoveUp = (i) => {
    if (i === 0) return;
    const updated = [...slides];
    [updated[i - 1], updated[i]] = [updated[i], updated[i - 1]];
    updateSlides(updated);
  };

  const handleMoveDown = (i) => {
    if (i === slides.length - 1) return;
    const updated = [...slides];
    [updated[i], updated[i + 1]] = [updated[i + 1], updated[i]];
    updateSlides(updated);
  };

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditId(null);
    setErrors({});
    if (desktopRef.current) desktopRef.current.value = '';
    if (mobileRef.current)  mobileRef.current.value  = '';
  };

  return (
    <div className="min-h-screen bg-cream p-5 md:p-10">
      <div className="max-w-6xl mx-auto">

        {/* ── Header ── */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl md:text-4xl text-brand">Banner Slider</h1>
            <p className="text-luxury-muted text-sm mt-1 font-sans tracking-wide">
              Manage homepage promotional banners
            </p>
          </div>
          <button
            onClick={() => setPreview(v => !v)}
            className="btn-outline border-brand text-brand hover:bg-brand hover:text-cream px-5 py-2.5"
          >
            {preview ? 'Hide Preview' : 'Preview Slider'}
          </button>
        </div>

        {/* ── Live preview ── */}
        {preview && (
          <div className="mb-10 border border-cream-deeper shadow-luxury overflow-hidden">
            {slides.length > 0
              ? <BannerSlider slides={slides} />
              : <div className="h-40 flex items-center justify-center text-luxury-muted font-sans text-sm">No slides to preview.</div>
            }
          </div>
        )}

        {/* ── Saved toast ── */}
        {saved && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-5 py-3 text-sm font-sans flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
            Slide saved successfully.
          </div>
        )}

        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8 items-start">

          {/* ── Form ── */}
          <div className="bg-white shadow-card p-6">
            <h2 className="font-display text-2xl text-brand mb-6">
              {editId ? 'Edit Slide' : 'Add New Slide'}
            </h2>

            <ImageField
              label="Desktop Image"
              required
              error={errors.desktopImage}
              value={form.desktopImage}
              fileRef={desktopRef}
              onFile={e => handleFile(e, 'desktopImage')}
              onClear={() => clearField('desktopImage', desktopRef)}
              onUrl={v => handleUrl(v, 'desktopImage')}
            />

            <ImageField
              label="Mobile Image"
              error={errors.mobileImage}
              value={form.mobileImage}
              fileRef={mobileRef}
              onFile={e => handleFile(e, 'mobileImage')}
              onClear={() => clearField('mobileImage', mobileRef)}
              onUrl={v => handleUrl(v, 'mobileImage')}
            />
            <p className="text-[11px] text-luxury-muted font-sans -mt-3 mb-5">
              Optional — falls back to desktop image on mobile if not provided.
            </p>

            <Field label="Redirect Link" required error={errors.link}>
              <input
                type="text"
                value={form.link}
                onChange={e => { setForm(f => ({ ...f, link: e.target.value })); setErrors(er => ({ ...er, link: '' })); }}
                placeholder="/collections  or  https://example.com"
                className="w-full border border-cream-deeper px-4 py-2.5 text-sm font-sans text-luxury focus:outline-none focus:border-gold transition-colors"
              />
            </Field>

            <div className="flex gap-3 pt-1">
              <button onClick={handleSubmit} className="btn-primary flex-1 justify-center">
                {editId ? 'Update Slide' : 'Add Slide'}
              </button>
              {editId && (
                <button onClick={resetForm} className="btn-outline border-cream-deeper text-luxury-muted px-5 hover:border-brand hover:text-brand">
                  Cancel
                </button>
              )}
            </div>
          </div>

          {/* ── Slide list ── */}
          <div>
            <h2 className="font-display text-2xl text-brand mb-5">
              Slides
              <span className="font-sans text-sm font-light text-luxury-muted ml-2">({slides.length})</span>
            </h2>

            {slides.length === 0 ? (
              <div className="bg-white shadow-card p-10 text-center text-luxury-muted font-sans text-sm">
                No slides yet. Add one using the form.
              </div>
            ) : (
              <div className="space-y-3">
                {slides.map((slide, i) => (
                  <div
                    key={slide.id}
                    className={`bg-white shadow-card p-4 flex items-center gap-4 transition-all duration-200
                      ${editId === slide.id ? 'ring-1 ring-gold' : ''}`}
                  >
                    {/* Order controls */}
                    <div className="flex flex-col gap-0.5 flex-shrink-0">
                      <button
                        onClick={() => handleMoveUp(i)}
                        disabled={i === 0}
                        className="w-5 h-5 flex items-center justify-center text-luxury-muted hover:text-brand disabled:opacity-25 transition-colors"
                        aria-label="Move up"
                      >
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 15l-6-6-6 6"/></svg>
                      </button>
                      <span className="text-[10px] font-sans text-luxury-muted text-center leading-none py-0.5">{i + 1}</span>
                      <button
                        onClick={() => handleMoveDown(i)}
                        disabled={i === slides.length - 1}
                        className="w-5 h-5 flex items-center justify-center text-luxury-muted hover:text-brand disabled:opacity-25 transition-colors"
                        aria-label="Move down"
                      >
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg>
                      </button>
                    </div>

                    {/* Thumbnail */}
                    <img
                      src={slide.desktopImage}
                      alt={`Slide ${i + 1}`}
                      className="w-24 h-14 object-cover flex-shrink-0 bg-cream-dark"
                    />

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-sans text-brand font-medium truncate">{slide.link}</p>
                      <p className="text-[11px] text-luxury-muted font-sans mt-0.5">
                        {slide.mobileImage !== slide.desktopImage ? '✓ Mobile image set' : 'Mobile: fallback to desktop'}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-1.5 flex-shrink-0">
                      <button
                        onClick={() => handleEdit(slide)}
                        className="text-[11px] font-sans px-3 py-1.5 border border-brand text-brand hover:bg-brand hover:text-cream transition-colors duration-200 tracking-wider uppercase"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(slide.id)}
                        className="text-[11px] font-sans px-3 py-1.5 border border-red-200 text-red-400 hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors duration-200 tracking-wider uppercase"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Export hint */}
            {slides.length > 0 && (
              <p className="mt-4 text-[11px] text-luxury-muted font-sans">
                Slides are saved to <code className="bg-cream-dark px-1 py-0.5 rounded text-[10px]">localStorage</code>.
                For production, connect <code className="bg-cream-dark px-1 py-0.5 rounded text-[10px]">updateSlides()</code> to your backend API.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
