'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

type FormData = {
  url: string;
};

type LinkedInProfileData = Record<string, any>; // you can replace this with actual data shape if needed

const Linkedin = () => {
  const { register, handleSubmit, formState } = useForm<FormData>();
  const [data, setData] = useState<LinkedInProfileData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchLinkedInProfile(linkedInUrl: string) {
    const res = await fetch('/api/linkedin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: linkedInUrl }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Something went wrong');
    return data.data; // assuming `data.data` contains the scraped info
  }

  const onSubmit = async (values: FormData) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const result = await fetchLinkedInProfile(values.url);
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Scrape LinkedIn Profile</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register('url', { required: true })}
          type="text"
          placeholder="Enter LinkedIn profile URL"
          className="w-full border border-gray-300 p-2 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Scraping...' : 'Submit'}
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {data && (
        <div className="mt-6 bg-gray-100 p-4 rounded text-black">
          <pre className="text-sm overflow-x-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default Linkedin;
