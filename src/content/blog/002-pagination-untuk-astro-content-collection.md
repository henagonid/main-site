---
title: Menambahkan Pagination Untuk Astro Content Collection
subTitle: Pagination sangat penting dalam sebuah app, terutama untuk mengurangi load time
topic: Performance
tags: [Astrojs, Content Collection, Pagination]
image:
  src: ../../assets/images/pagination-illustration.jpg
  alt: pagination data illustration
author: andika
pubDate: 2024-01-05T12:00:00+07:00
draft: false
---

## Pagination
*Pagination* adalah sebuah metode untuk meningkatkan performa sebuah website, terutama saat menampilkan banyak item. Seperti daftar artikel, daftar barang, dan sebagainya. Karena daftar artikel dipecah & ditampilkan secara bertahap dengan membaginya ke dalam beberapa halaman, maka waktu yang dibutuhkan untuk menampilkan sebuah halaman akan jauh lebih cepat.

## Pagination di AstroJs
AstroJs adalah salah satu web framework yang memiliki performa cukup bagus, terutama dalam pembuatan sebuah website. Di dalam dokumentasinya, AstroJs telah memberikan contoh pembuatan pagination di dalam ekosistem AstroJs. Akan tetapi, pagination yang dibuat masih menggunakan load markdown, yang merupakan cara lama.

## Pagination Content Collection
Ada beberapa hal yang harus dilakukan dalam pembuatan pagination dengan *Content Collection*. Dalam tulisan saya ini, yang dihasilkan adalah ***SSG (Static Site Generation)***. Yaitu halaman - halaman akan *digenerate* menjadi *static file html*.

### Nama File
Buatlah nama file halaman di dalam directory `/pages` dengan nama `[...page].astro`.

### Load Data
Di dalam fungsi `getStaticPaths`, ambil data content collection seperti biasa
```js
export const getStaticPaths = (async () => {
  /* load data */
  const blogEntries = await getCollection('blog', ({ data }) => {
    return !data.draft;
  })
  /* reverse to get latest entries first */
  blogEntries.reverse();

  ...
}) satisfies GetStaticPaths;
```

### Paginate Content
Kemudian ambil `paginate` dari parameter fungsi, dan jalankan sebagai return fungsi `getStaticPaths`
```js
export const getStaticPaths = (async ({ paginate }) => {
  /* load data */
  const blogEntries = await getCollection('blog', ({ data }) => {
    return !data.draft;
  })
  /* reverse to get latest entries first */
  blogEntries.reverse();
  return paginate(blogEntries, {
    // 8 post per page
    pageSize: 8
  })
}) satisfies GetStaticPaths;
```

## Tampilkan sebagai Pagination
Selanjutnya tinggal menampilkan paginationnya. Fungsi `paginate` di atas akan *mengenerate* props maupun params ke dalam halaman, dan kita dapat memanfaatkannya.

### Dengan `page` Props
Kita akan mendapatkan data `page` di dalam `Astro.props`
```js
const { page } = Astro.props
```
Ada beberapa data yang bisa kita peroleh dari `page` tersebut. Beberapa diantaranya adalah `data`, yang berisi blog entries yang sudah dibagi - bagi.Selanjutnya ada `url` yang berisi data pagination seperti halaman selanjutnya atau sebelumnya, serta halaman saat ini.

### Tampilkan Data
Untuk menampilkan data bisa dengan perulangan seperti biasa.
```js
{page.data.map(entry => (
  <ArticleItem entry={entry} />
))}
```
Kemudian untuk link pagination nya bisa juga langsung digunakan sesuai kebutuhan.
```js
{page.url.prev ?
  <a href={page.url.prev}>
    <span>Prev</span>
  </a> : null
}
{page.url.next ?
  <a href={page.url.next}>
    <span>Next</span>
  </a> : null
}
```

## Kesimpulan
Sebenarnya untuk membuat pagination di AstroJs tidak terlalu sulit, AstroJs sudah memberikan fungsi yang cukup *powerfull* dan tinggal pakai saja.
