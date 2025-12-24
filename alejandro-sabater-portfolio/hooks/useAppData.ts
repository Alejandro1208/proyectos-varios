import { useCallback, useEffect, useState } from 'react';
import { AppData, ProfileData, Project, SocialLink } from '../types';
import { INITIAL_DATA } from '../data';

const API_BASE = import.meta.env.VITE_API_URL ?? '/api';

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  const contentType = res.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    const text = await res.text();
    throw new Error(`Respuesta no es JSON: ${text.slice(0, 120)}...`);
  }

  return res.json();
}

async function fetchAppData(): Promise<AppData> {
  const [profile, projects, socials, videos] = await Promise.all([
    fetchJson<ProfileData>('/profile'),
    fetchJson<Project[]>('/projects'),
    fetchJson<SocialLink[]>('/socials'),
    fetchJson<AppData['videos']>('/videos')
  ]);

  return {
    profile,
    projects,
    socials,
    videos
  };
}

export function useAppData() {
  const [data, setData] = useState<AppData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchAppData();
      setData(result);
    } catch (err) {
      console.error(err);
      setError('No se pudo cargar la información en vivo. Mostrando datos locales.');
      setData(INITIAL_DATA);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, reload: load };
}
