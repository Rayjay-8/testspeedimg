// speedTest.js
import fetch from 'node-fetch';
import { performance } from 'perf_hooks';

const imageUrls = [
  { name: "Vercel Blob", url: "https://6w8od0naqkkwxclw.public.blob.vercel-storage.com/img-rDQH15RGcmG00WYlmlMIh3igypaOXO.png" },
  // { name: "Supabase", url: "https://dupdfizlkrggeqeivwha.supabase.co/storage/v1/object/public/publico//img.png" },
  { name: "Cloudflare R2", url: "https://pub-5635a0fb0112407381937ce5f8906cb9.r2.dev/img.png" },
  { name: "bunny", url: "https://gitfull.b-cdn.net/img.png"}
];

async function testImageSpeed(urls) {
  const results = [];

  for (const { name, url } of urls) {
    const start = performance.now();
    try {
      const response = await fetch(url);
      await response.arrayBuffer(); // Força download
      const end = performance.now();
      results.push({ name, time: end - start });
    } catch (err) {
      results.push({ name, time: null, error: err.message });
    }
  }

  console.log("\n📊 Resultados do Teste de Velocidade:");
  results.forEach(r => {
    if (r.time !== null) {
      console.log(`${r.name}: ${r.time.toFixed(2)} ms`);
    } else {
      console.log(`${r.name}: ❌ Erro - ${r.error}`);
    }
  });
}

testImageSpeed(imageUrls);
