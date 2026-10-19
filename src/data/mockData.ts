import { Book, Quote, FriendSession, BookClub, LiveEvent, CustomShelfData, MilestoneBadgeData } from '../types.ts';

export const INITIAL_BOOKS: Book[] = [
  {
    id: 'tomorrow',
    title: 'Tomorrow, and Tomorrow, and Tomorrow',
    author: 'Gabrielle Zevin',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBl-cyzqgCgSfeO8IudUJI1RcXJL1xmNKvB9TE7o9R76AMHWT7Tzhc1vQsJACcRpXbyOr5zRRDMSqe7J_kJrzRnzfSdAJxeYGPmpC8U7QBd-svC6ZKjNn6_XOSFOI20LtYAQbIw0uPFWJhUe6N2SVx0CDMgf93Cb6VvMRbOMl6OfMCtoLXVxPQcnEWx7W2kkhuhfXnGRDTY5B42y202LYaEu8wdoPsyUarPjqYSPXOhMrzS2X3SX4keYQ',
    alt: 'Tomorrow, and Tomorrow, and Tomorrow book cover with retro pixel waves, Japanese woodblock aesthetics, warm terracotta and ochre gold.',
    totalPages: 416,
    currentPage: 274,
    progressPercent: 68,
    status: 'reading',
    genre: 'Literary Fiction',
    rating: 4.8,
    readingTimeMinutes: 42,
    audioSync: true,
    downloaded: true,
    lastReadTime: 'Today, 8:45 AM',
    badge: 'Current Read',
  },
  {
    id: 'piranesi',
    title: 'Piranesi',
    author: 'Susanna Clarke',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYEgdaIwGCZrFZfyuIVhUlelxr8n_Ufotk5QweTMgD4sc_uLPzKXKG0N8EueArlYJlr8an3QQ_4DQBXI-ZtiEQei1Fned4ysQS_LiSHCkFaCydZRYf050CUuLz9Hs6knt6QDFcYsLsg-QMQKihms5hHSWric_eJZmc5wE8oKf64ipa5HZIqL0Hsk-uXnAaOQrC5SmDWtatb5Q3NJfXxNaopbCw3zrsb10l45Q7ityfq3GnfyvfLGdw0A',
    alt: 'Piranesi by Susanna Clarke showing futuristic marble statues and labyrinth sea halls in warm amber sunlight.',
    totalPages: 245,
    currentPage: 78,
    progressPercent: 32,
    status: 'reading',
    genre: 'Fantasy',
    rating: 4.9,
    readingTimeMinutes: 18,
    audioSync: false,
    downloaded: true,
    lastReadTime: 'Read yesterday',
    badge: 'Reading',
  },
  {
    id: 'klara',
    title: 'Klara and the Sun',
    author: 'Kazuo Ishiguro',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpCMkl4-tuXK92_Azz7W2OhfNThfwtC-QMA4cF5hjGJd4dx17zGeyE5_d5lp6mMT4izr4mMT0ji1KWx-l1dkjCdcdaxf84nQnXGjUcHdRG1PBC_f1ByV7l5W_7YEsIaM2sJ6UCBiIic54_g2OrVnILsGEhjkNPCJL6RxM_VzbAaAjTZSD-PnO4nNM5OBk8lQwATgTtvbofVObjzFow1_sjCOeKzWhtcTVgw4Zy-4fpbr1910RNDa78Xw',
    alt: 'Klara and the Sun cover with luminous geometric silhouette of a young artificial friend looking through shop window towards solar glow.',
    totalPages: 304,
    currentPage: 142,
    progressPercent: 46,
    status: 'reading',
    genre: 'Sci-Fi Speculative',
    rating: 4.7,
    readingTimeMinutes: 25,
    audioSync: true,
    downloaded: true,
    lastReadTime: '3 days ago',
    badge: 'Buddy Sync',
  },
  {
    id: 'midnight-library',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQfR_UEHIVMNG9tzPbj4HIrOfrdE4g0Oy66rYiijEO46ULrHYlJ44w2C39qrsCgXALgYrLX9ewQFaMwMR-vUE6aWD6M5Ae4xnZtT_bdD0xxTmB42_dVcJ6HA7g1GX2xpuE0573AqnKYmPMq0PaaYvTup613iUwUs0IMbgi4Yl3RBw9gU-VbPybaxJ-LdtpDxFoUhmIVghX5oEv9GZx8Ldeb2gQRKsSqVzDmn1e37Zcuqd9Zjc5gBjMHA',
    alt: 'The Midnight Library by Matt Haig, sea, starry sky, deep blue and terracotta accents.',
    totalPages: 288,
    currentPage: 288,
    progressPercent: 100,
    status: 'finished',
    genre: 'Fiction',
    rating: 4.6,
    readingTimeMinutes: 304,
    audioSync: false,
    downloaded: true,
    quotesCount: 14,
    lastReadTime: 'Finished Nov 2024',
    badge: 'Finished',
  },
  {
    id: 'gentleman-moscow',
    title: 'A Gentleman in Moscow',
    author: 'Amor Towles',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOODiKuSK8qRD-QbILaJX8s0HDY3WQNzicLLv4KtctygkyuvTznzDacsmseNWbCgmRIoIsp_3FF4trX4k-Oqr7Coy98FLCGX9rjwXm-7Ij2i4wwZ-KWshJ5omOyNV3QBC4MzY33tS5bH7aiOTYDLqVlQxm_yZjHXL095O98uLzrXo90vAB5tpPWutRElNU-SARW-NShqxgMXSFs9DODUgwjHIr5AL9wnE7xp8vCgv5hTiV5a0Zr6FhhQ',
    alt: 'A Gentleman in Moscow by Amor Towles with grand hotel Metropol aesthetic, vintage parchment and gold lettering.',
    totalPages: 480,
    currentPage: 480,
    progressPercent: 100,
    status: 'finished',
    genre: 'Historical Fiction',
    rating: 5.0,
    downloaded: true,
    audioSync: false,
    lastReadTime: 'Finished on Oct 14',
    badge: 'Finished',
  },
  {
    id: 'dune',
    title: 'Dune',
    author: 'Frank Herbert',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrQZideBBxIMPHg3BO-HPmzOpzNQDpZcWcr7hVppd5deqhit9WMDq7qgQiISwrsWM9nfqIb6WnGB74Zhjwn_Xe29hGi_MYuaOtHd7xXF7yRb2b5y5sY2vHxBh73uQF3hWczqqw86HnZi2M8HV4am-wpvN7RBkijy6VhRL92OSaUuritAXUeD61tITCb7YJb5LobZONVtCOQttJ_HXFsygFeczsf21MevpvV1OhcID1DrB4wMFku00wbw',
    alt: 'Dune by Frank Herbert, sprawling golden desert dunes with subtle sandworm horizon crest.',
    totalPages: 688,
    currentPage: 0,
    progressPercent: 0,
    status: 'want',
    genre: 'Sci-Fi Epic',
    rating: 4.8,
    estimatedHoursLeft: 'Est. 14 hrs',
    downloaded: false,
    audioSync: false,
    badge: 'Queued',
  },
  {
    id: 'project-hail-mary',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7fAb6obNCpsdwLUxC77mdYh2IoRb_1AlUatgCUuGNPi5u7k1l_x7rRDeqRFaj4QZIlzufjtjVBtaoZ5UnAZ-7qTAc88-KNMB563oKqB5K_LcpyXRvKozrwNuAzw7mKNArqf0bDo5fvkJczuGDhlqx2jy_YEGDyGt-KSaqvaosdM7nKGqIX6PYbYLVZX18zTHQMdY2YsNJDANK_49FZTocHJw0ipUa7UtEjob_UmCUvCshKAAUIywW4A',
    alt: 'Project Hail Mary with small lone spacecraft approaching blazing star with solar flare streaks.',
    totalPages: 496,
    currentPage: 58,
    progressPercent: 12,
    status: 'reading',
    genre: 'Hard Sci-Fi',
    rating: 4.7,
    audioSync: true,
    downloaded: true,
    lastReadTime: '5 days ago',
    badge: 'Reading',
  },
  {
    id: 'before-coffee-cold',
    title: 'Before the Coffee Gets Cold',
    author: 'Toshikazu Kawaguchi',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoStmm1ozRnYyyKmEsWC1MB090NupIFYp6BwYlVDelx6WuI9sNUkAxWEMzGWmyXydHMvPfp6WVYsUk4RWN1y3F3kZbI_EPPm1yAvYjPdWSz-PnyvRr0CYKppSTaSNofqSsf-pb7PFEfsxXCFTffeDjM-23rP0V0R0lQx_TQoTdAH-mw_S0BRa6MjlRhtCKWQ3bNnxdhAb5KU9ls71usa7Nc2WHFd3mRQDlm2slQqrtKSxYX4xzbmTaeQ',
    alt: 'Before the Coffee Gets Cold with steaming ceramic teacup on small wooden table in warm Tokyo cafe morning light.',
    totalPages: 224,
    currentPage: 0,
    progressPercent: 0,
    status: 'want',
    genre: 'Cozy Japanese Lit',
    rating: 4.4,
    estimatedHoursLeft: 'Est. 3.5 hrs',
    downloaded: false,
    audioSync: false,
    badge: 'Queued',
  },
  {
    id: 'thursday-murder-club',
    title: 'Thursday Murder Club',
    author: 'Richard Osman',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5cix9f1H8-ZAasXF1xvxTmZYRESQGfY44Avpup4Ep4igX-Gq0YsvZ1D-Gvdpzod_XVV0afATWVvAbCs3UngANHQ2lfBCM7yxTgC4Tb9inKJHu2cMuvrSAMJ6DK3ZIywHQEztFBkxGpN2_MNqM1HNIWgFjbO6fnuuWfeoEG9NZfcMLDquPg-YdiC1TUvTwi5J_gTfAJEp4vtS0fZCwDXiBBg76igvZBf_1NgVrnh0RYqSYsNhcl0ttFA',
    alt: 'The Thursday Murder Club cover with vintage British tea cups and cozy magnifying glass artwork.',
    totalPages: 400,
    currentPage: 60,
    progressPercent: 15,
    status: 'reading',
    genre: 'Cozy Mystery',
    rating: 4.3,
    downloaded: true,
    audioSync: false,
    badge: 'Reading',
  }
];

export const INITIAL_QUOTES: Quote[] = [
  {
    id: 'q1',
    text: 'The beauty of the House is immeasurable; its Kindness infinite.',
    bookTitle: 'Piranesi',
    author: 'Susanna Clarke',
    page: 112,
    likes: 42,
  },
  {
    id: 'q2',
    text: 'Between life and death there is a library, and within that library, the shelves go on forever.',
    bookTitle: 'The Midnight Library',
    author: 'Matt Haig',
    page: 14,
    likes: 56,
  },
  {
    id: 'q3',
    text: 'There are whole years where nothing happens, and then days where a century passes.',
    bookTitle: 'A Gentleman in Moscow',
    author: 'Amor Towles',
    finishedAgo: 'Finished 2w ago',
    likes: 38,
  },
  {
    id: 'q4',
    text: 'To allow yourself to play with another person is no small risk. It means allowing yourself to be open, to be exposed...',
    bookTitle: 'Tomorrow, and Tomorrow, and Tomorrow',
    author: 'Gabrielle Zevin',
    page: 274,
    likes: 67,
  }
];

export const ACTIVE_FRIENDS: FriendSession[] = [
  {
    id: 'marcus',
    name: 'Marcus Vance',
    handle: '@marcus_v',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC48izY-BKho8VqK5i-_G86t8MQtLETQRQFEalYXAudfHnjWZF6novPGL4Th69_2f3aPgkCTo4EzzRNv_bA_1lewv1uNluRQYMI4ii9pl5ye7ZEgyd5onN3A5xInuF6l_lv6N5QjIxs2ZCm49Gq_bzNvzAUEudBRQkkveUySHHZtUtW6cqN7QZ2xKmE3xYPm5i8AFTr9C5FUMsKIla6oRgoHsolkxpgp_G3RTsOJCOjfLhXxjI_ZuD2uQ',
    alt: 'Marcus reading in a sunlit wooden library cafe with warm natural film grain.',
    readingBook: 'Dune',
    chapter: 'Ch. 7',
    status: 'active',
    mode: 'Silent',
    sessionNote: 'Reading Ch. 7 • Active now',
    bookPage: 180,
  },
  {
    id: 'elena',
    name: 'Elena Rostova',
    handle: '@elena_lit',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFAFuiZHZorXN3h7Ea5wszNCi6m1UbKlitOWpA3yGhRbXawhJL1SDLDhDFsGUajIivi5dxU9BRzjfhzgpM4dAxg2bP2iyct9bNYu5fm0lHI6gGFtjbC_ObuN7UkdM3hT9HSUI3vRVY0TG55VgnVA85a6WBOH-h5KEKk3e_--1zO5D07VffxNZfKn5KH1RHTLrEpvse5VEHZpZnYaZ7Tfjc6LD72CiMQMi6CD_b4FPI9ZYidhtvN-Ff7Q',
    alt: 'Elena holding a ceramic tea cup in cozy soft indoor library lighting.',
    readingBook: 'Pachinko',
    bookPage: 142,
    status: 'active',
    mode: 'Normal',
    sessionMinutes: 25,
    sessionNote: '25 mins into session',
  },
  {
    id: 'liam',
    name: 'Liam Chen',
    handle: '@liam_c',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkue4_wtcJddHngGOMFNHD97FKIlsfq6ruM1IUqczgf7O6nBwFtJUmT_4RQ6fpZ9aV-FBMkBUw95X0yguqLpofyMPqG9vDbGok3hy43lP7mV0hSsCG7zLtyTyKK6qUY5m_pPG34f4idm4rXP7jAf8sTtBSC-j2J2u3k0kqnzvLOcDiHQ6eZx7QK6GMq-mTSYjPOvzYhZH6Bj7_o8l2CzO-0Y-jTpU8SQB2aaIInsBgPD2rWkhLBins4Q',
    alt: 'Liam smiling subtly in a bohemian coffee shop with earthy amber light.',
    readingBook: 'Klara and the Sun',
    chapter: 'Ch. 4',
    status: 'active',
    mode: 'Lo-Fi',
    sessionNote: 'Listening to Cafe Lo-Fi',
    bookPage: 140,
  }
];

export const CUSTOM_SHELVES: CustomShelfData[] = [
  {
    id: 'rainy-day',
    title: 'Rainy Day Reads',
    description: 'Slow-burn gentle pacing, melancholy weather themes, and quiet introspective narratives.',
    booksCount: 14,
    booksRead: 6,
    accessType: 'private',
    theme: 'terracotta',
    covers: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCWAd_ZfzSG09R46N0Db_ALwAC1-wO_XfnEblDmZwLxKtyNzTznD2sqPCk23m4K6lsjZrOr19VOKWqd1dw2gNqwHNs_l4O67Iq8WIZtxwVzDUMyK_K9YhdkY028Xev8J5Tvx1IfewGuyeq-weSsYW6t3tXA3mMD7NOUcYIEPPqztd-jq3l-cGSD6CITYlOgeKVv56LSxyog3klKmS3mvZO6zzi5yI2jU3uVyiPMXulnuGcuwh70MyvLrQ',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBmiadCM7VqD1L9ReOiSnAkKKKmHVbfXQAu9QhTdZIPtW1RnhSq1i3ng5uSjqjjh_hTtobVEUkGE_G1aOyZwLMm2ik9zB9ediXCsD3Mv2qBMbWrCRZo2_rXSeXa7KRvZNkCeG5L-au8fFEWQxft-NAQUDEN0Cs4LIBiYiHCuBcVYFXi7lCrUE13-3rIhj39aZFHZPDy9pO4khsQTb6mkH1uuS0Wo2b9kUwA5Ag01QE24KjMqcWVqCPfkQ',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBI1_4x1vpc1Qxj6WsvRRyOynRcvhW2Dcrdrnj77zFGaP5RU2Smu91vX94hp9GxdKfdFIgYCRg80nbUAZGoA6PYEtJCoDP7x2O7W87Di8iyIUoHAW9GykvqcH0ClInz7abMEhMfBXrSwpX699Kb4RuDcILFogYCtNer2gRGiS5tCy8MI7cLWAdX-MGgM6_QQua3bGKE0o0vIU7jmhpaUZqN_VvAdk8myBRMGk2PTreLEizvWegc8-pEeQ'
    ],
    paceNote: 'Relaxed pace'
  },
  {
    id: 'mindset-focus',
    title: 'Mindset Shift & Deep Focus',
    description: 'Cognitive science, creative stamina, and building deliberate contemplation rituals.',
    booksCount: 9,
    booksRead: 6,
    accessType: 'friends',
    theme: 'sage',
    covers: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBoJTEmALsVMfrc8w29wIBumy5HC_dB4TH369DytZ8QPn2qSBleWl7HHUCSzwJ5L9lrj4Foma4kqoDl4-9M7rz7G0bu3qmSM0FJiXJlPZsGZ-BB0y_fwF6-mX4REbLQbzYr3QHZmNdPu-eCUscQIgXVOhIH_ewKJtfJjmbGgT56jRuO6LfiBltHe9SPVwa1mG9XrSLovNYcbms6HS7xAkeEpqRompwa6qCoCJFFKOEuqPsegBtLKD0Mbg',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCzSHcgWDO0wAGH8Wog458rlhmgBtYeovRx3wpeRWKaMkB8hSxtV3DWG7TnXA5Wwfw-v6s0nAu4k_WomwCUHm7_Bc5jMGYjPsYChigeYbb6UeztyOWJAUwWcWlmr6N1iRfCxxSZUvwdKL_VULiUXF03b_7ooY0bV8wv2FhjApzZ-Y-D0RHga22ej63jMDowsWRiigqogsehPGtY-AellbTw_c5mwy9dWwwUWpNs47U35eKRGwP6o7fZqg'
    ]
  },
  {
    id: '2026-masterpieces',
    title: '2026 Masterpieces',
    description: 'All-time essential literature on queue for this year’s deep reading commitment.',
    booksCount: 25,
    booksRead: 18,
    accessType: 'public',
    theme: 'terracotta',
    covers: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDD92_qVslgZ8dKwKT9FEaI8_wg9V6H2iN8yiiOIxj6jX95_XUxdkg3_EFanlvmeDxaFNfBIo8BuY9vuvbv-s0_oN8HA2Mf2p-khxGMWe1QVRh90tkEonMFXCaWrZAVb8Kw_PKybjoP-p0CqNiwlm36qrpza5PG4TJP6lmJS69uTfXXcbzy2zgyWy6xQxfqqX9541N4SGHtTS0yODEv_NXdWx-gWWkM9x_otj1cl-FR6ly8j6zUjLvaTQ',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDBrC46BvmBHFfJPAwtdJjFrN_kvbVXB8XXrkSYPo6OqS2t7OzMjRR_EzDgko_zYgeBV9km1B5gdKRrdgFo8AjdcmmVN9qZycyYzZD4RztXIg7eEW2MrCbgiUCw_brmBO5epTrboNWAblvcE5KP1FIGzgaNp-HAf6-wtVDhlPkT_9uRdt9e3lzNwhzso0_NzR1KAdeOjGtTXZX93vjT6Ca98tnolYO3io-X9DRvpl9Jg9-8PeGgLmBgGg',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBdPkZ9Ai_g7eQaDrSiG9fvTvN8a9e8V9gAf8_bqNN6gE-jJDZ6_itNKU3lLTKCxnHhXtopLANPoGXa849rmnRRWe5M3csDqhjdz3QPdqNaGtQW4vm9CfoCnRgOSr7iJDItQQhYqcHvCzys6-YVw2OPCfIEyzTRZFDt8Bsw3c6xrTyQXCX7qWWtHuIC30z2kraKMcAdvYb7snSuXVUZi0Gs2eQLKN5JvlVx2diCoiHDCn0394HgUX5K9Q'
    ]
  },
  {
    id: 'philosophical-salons',
    title: 'Late Night Philosophical Salons',
    description: 'Epistemology, ethical quandaries, and late-night chapter discussion threads.',
    booksCount: 7,
    booksRead: 2,
    accessType: 'circle',
    circleName: 'Buddy Circle #04',
    theme: 'midnight',
    activeThreads: 4,
    covers: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBtIIQyJpVmEo1w9AQY7DRFAroPxdzzyUqZ_sSi5Uvd1A956Q9TV7s72wfmPfLN7GXfciNg5Sb-6Gm0nedzoVJK21KRN1nuy61V76YoWEOFSyQFaRJiSZbxEbSHuGcAqKXAjhOJhKSP2eOC5hKFWlV1fyh9MkS9QC8OVrvtaucmirsz2tk4qGe2hTplFM1C_pdJ1MD8SJBf35uZ4DzCBsTAQPOtGO26iooClTBirLW5lEjBHWkIi1nXCw',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDPqAmx16XEoz48ibhReZV4GfLx59QfMfPpBwLH0Taq4YzuK2WgW66Fqyl4SpLem4sNDfrYlo9SSy9ewOXniK_XflE7kzP5reuVQXa4BKxkJbJ9egZ7aVJZWVQrx63IAS-IxMRHUKO3T4s2Vz5TB5qmTfDKNiSpjtCxkf2_C513AWXocXITNrTeqyN-_1mTTSdecSrkRweW4o5CckI89MmZLgok8Idb773XvIq2uBuoM3X0DBDJIRWMIg'
    ]
  }
];

export const BOOK_CLUBS: BookClub[] = [
  {
    id: 'scifi-speculative',
    name: 'Sci-Fi & Speculative Explorers',
    membersCount: '1.4k',
    onlineCount: '42',
    currentBook: 'Project Hail Mary',
    nextSession: 'In 3 days',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYF7icMIvU5lHeZXQe9UsAxkw9xITjJkvabw4840dKhgpYaj4Y9kIIKzVbGiuy_eWbKOF4UrTpqQAYBIhl22TvDp1S44o-vlHaCZTmcp-CEdNF05Dj2AWwIkDpwFnKm6OSFGgXnVTHx1C-DJooubLjptWVHoevJlos6Q3rpB0hJMG1Tp7BAGM3LlcIpVyjmyN-eqR50ZvyNqz7MEbOX8CUNKck1fVLfQvyRVxn44jb4aVleVXrWxWC7w',
    alt: 'Sci-Fi club cover with deep amber nebulae and architectural rings.',
    isJoined: true,
  },
  {
    id: 'cozy-parlor',
    name: 'The Cozy Fiction Parlor',
    membersCount: '890',
    onlineCount: '18',
    currentBook: 'Before the Coffee Gets Cold',
    nextSession: 'Sunday',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7FxXu8H_5CQVtbfa2XjPk_BQGMFwGAl02kq_f2K1O4B04-j9NR_44lkfcqcNWn4maPBWgpWMEUADL4VST6LWXPyQWqKEGucsCePIeTZ7YjXEmxqeZVCISh9o_TY4-A_ohOHr_rxtBAYRWEH7Wh0fNbVp545LVzOHBrYdRu_SqulTvFMaxs_BQrNudr9olbQZvO75JR6XMa57hsCyZ2ueJ9SGCicoHEyHYoW_hcW6wVutcsRH9cl6npA',
    alt: 'Warm steaming mug of coffee beside open novel.',
    isJoined: false,
  },
  {
    id: 'philosophy-circle',
    name: 'Philosophy & Mindset Circle',
    membersCount: '2.1k',
    onlineCount: 'Weekly salons',
    currentBook: 'Meditations by M. Aurelius',
    nextSession: 'Today 9 PM',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCW8fj6c8rqc_mOkuM4aYm13GUrnWRMVhz3rVtZ47bSWUG1dwmOx7lO5mDAt73FXHjcJ06D9hkAC1_34p-8g3HM_VVEmnssQy4HzjnJJt14F0WNb-6KT_VKwUP2ZE0wJwjTdh9GOa-MEUKmyfWvdLv9myWlHzagZrp6RVTy2laK7dYkvUC-FxLeZVMwDWN4F-zPim90t0XzlMknkKqX09lCjrI88v083ErnaGUvaQ8HMHnObjbPqS6EPA',
    alt: 'Ancient marble bust juxtaposed with clean golden scales.',
    isJoined: false,
  }
];

export const LIVE_EVENTS: LiveEvent[] = [
  {
    id: 'event-piranesi',
    type: 'Chapter Salon',
    title: 'Piranesi: Halls 1-5 Group Annotation',
    time: 'Thu 7 PM',
    host: 'Dr. Miriam Vance',
    description: 'Audio discussion & live text highlights across tidal rooms.',
    attendeesCount: 148,
    isRsvpd: false,
    accentBorder: 'primary',
  },
  {
    id: 'event-worldbuilding',
    type: 'Author Fireside Chat',
    title: 'Speculative Worldbuilding in 2025',
    time: 'Sun 3 PM',
    host: 'Guest authors & cartographers',
    description: 'Q&A session with guest authors on speculative cartography & architectural metaphor.',
    attendeesCount: 340,
    isRsvpd: false,
    accentBorder: 'tertiary',
  },
  {
    id: 'event-pomodoro',
    type: 'Silent Reading Room',
    title: '45-min Community Pomodoro Cafe',
    time: 'Today 8 PM',
    host: 'Bindnest Lounge',
    description: 'Lofi ambient background, focused deep reading block without interruptions.',
    attendeesCount: 65,
    isRsvpd: false,
    accentBorder: 'secondary',
  }
];

export const MILESTONE_BADGES: MilestoneBadgeData[] = [
  {
    id: 'night-owl',
    title: 'Night Owl',
    description: 'Read after 10:00 PM for 5 consecutive sessions.',
    unlockedDate: 'Unlocked Oct 18',
    isUnlocked: true,
    current: 5,
    target: 5,
    unit: 'sessions',
    icon: 'dark_mode',
    category: 'habit',
  },
  {
    id: 'weekend-warrior',
    title: 'Weekend Warrior',
    description: 'Logged over 120 minutes across a single weekend.',
    unlockedDate: 'Unlocked Oct 12',
    isUnlocked: true,
    current: 145,
    target: 120,
    unit: 'mins',
    icon: 'local_fire_department',
    category: 'marathon',
  },
  {
    id: 'bookworm',
    title: 'Bookworm',
    description: 'Read over 500 total cataloged pages this season.',
    unlockedDate: 'Unlocked Sep 29',
    isUnlocked: true,
    current: 740,
    target: 500,
    unit: 'pages',
    icon: 'import_contacts',
    category: 'speed',
  },
  {
    id: 'buddy-pioneer',
    title: 'Buddy Pioneer',
    description: 'Completed a synchronized reading session with a companion.',
    unlockedDate: 'Unlocked Oct 20',
    isUnlocked: true,
    current: 1,
    target: 1,
    unit: 'sync',
    icon: 'group',
    category: 'social',
  },
  {
    id: 'century-club',
    title: 'Century Club',
    description: 'Read 100 consecutive days without breaking your daily streak.',
    isUnlocked: false,
    current: 14,
    target: 100,
    unit: 'days',
    icon: 'lock',
    category: 'habit',
  },
  {
    id: 'epic-marathoner',
    title: 'Epic Marathoner',
    description: 'Finish a single volume over 600 pages in under 7 days.',
    isUnlocked: false,
    current: 320,
    target: 600,
    unit: 'pages',
    icon: 'lock',
    category: 'marathon',
  }
];

export const MOCK_FRIENDS = ACTIVE_FRIENDS;
export const INITIAL_SHELVES = CUSTOM_SHELVES;
export const MOCK_BOOK_CLUBS = BOOK_CLUBS;
export const MOCK_EVENTS = LIVE_EVENTS;
export const MOCK_MILESTONES = MILESTONE_BADGES;

export interface RecommendationBook {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  pages: number;
  estimatedDaysToFinish: string;
  affinityScore: number;
  moodMatch: string;
  reason: string;
  tags: string[];
}

export const MOCK_RECOMMENDATIONS: RecommendationBook[] = [
  {
    id: 'rec-sea-of-tranquility',
    title: 'Sea of Tranquility',
    author: 'Emily St. John Mandel',
    coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400',
    pages: 272,
    estimatedDaysToFinish: '~3.5 days at your pace',
    affinityScore: 98,
    moodMatch: 'Lush & Atmospheric',
    reason: 'Matches your love for non-linear time structures, quiet melancholy, and lyrical speculative elegance.',
    tags: ['Speculative', 'Time Travel', 'Melancholic', 'Short Read']
  },
  {
    id: 'rec-the-memory-police',
    title: 'The Memory Police',
    author: 'Yoko Ogawa',
    coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400',
    pages: 288,
    estimatedDaysToFinish: '~4.1 days at your pace',
    affinityScore: 94,
    moodMatch: 'Melancholic & Reflective',
    reason: 'Atmospheric, quiet fable of disappearances that speaks to your reflections on grief and quiet defiance.',
    tags: ['Fable', 'Japanese Lit', 'Atmospheric', 'Reflective']
  },
  {
    id: 'rec-babel',
    title: 'Babel: An Arcane History',
    author: 'R.F. Kuang',
    coverUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=400',
    pages: 544,
    estimatedDaysToFinish: '~7.8 days at your pace',
    affinityScore: 92,
    moodMatch: 'Philosophical Inquiry',
    reason: 'Rich translation magic systems, dark academia libraries, and intense moral debates on linguistic colonization.',
    tags: ['Dark Academia', 'Linguistics', 'Historical Fantasy', 'Long Read']
  },
  {
    id: 'rec-exhalation',
    title: 'Exhalation: Stories',
    author: 'Ted Chiang',
    coverUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=400',
    pages: 352,
    estimatedDaysToFinish: '~5.0 days at your pace',
    affinityScore: 96,
    moodMatch: 'Speculative / Sci-Fi',
    reason: 'Deep philosophical inquiry with gentle humanism; perfect pairing with Klara and the Sun.',
    tags: ['Short Stories', 'Mind-Bending', 'Sci-Fi', 'Philosophical']
  },
  {
    id: 'rec-before-coffee',
    title: 'Before the Coffee Gets Cold',
    author: 'Toshikazu Kawaguchi',
    coverUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&q=80&w=400',
    pages: 213,
    estimatedDaysToFinish: '~2.8 days at your pace',
    affinityScore: 89,
    moodMatch: 'Warm & Comforting',
    reason: 'Gentle, heartwarming cafe rules with an undercurrent of poignant tenderness. Ideal for rainy evenings.',
    tags: ['Cozy', 'Warm & Comforting', 'Magical Realism', 'Quick Read']
  },
  {
    id: 'rec-circe',
    title: 'Circe',
    author: 'Madeline Miller',
    coverUrl: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&q=80&w=400',
    pages: 400,
    estimatedDaysToFinish: '~5.7 days at your pace',
    affinityScore: 95,
    moodMatch: 'Lush & Atmospheric',
    reason: 'Lyrical prose, isolation turned into profound craft and fierce self-ownership. Highly resonant.',
    tags: ['Mythology', 'Lyrical Prose', 'Feminism', 'Character Study']
  }
];

