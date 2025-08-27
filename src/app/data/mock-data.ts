export const MOCK_PLAYLISTS = [
  {
    id: 1,
    name: "Rock Clásico",
    description: "Los mejores temas del rock de los 70s y 80s",
    songs: [
      {
        id: 1,
        title: "Bohemian Rhapsody",
        artist: "Queen",
        album: "A Night at the Opera",
        year: 1975,
        genre: "Rock"
      },
      {
        id: 2,
        title: "Hotel California",
        artist: "Eagles",
        album: "Hotel California",
        year: 1976,
        genre: "Rock"
      },
      {
        id: 3,
        title: "Stairway to Heaven",
        artist: "Led Zeppelin",
        album: "Led Zeppelin IV",
        year: 1971,
        genre: "Hard Rock"
      }
    ]
  },
  {
    id: 2,
    name: "Pop Latino",
    description: "Éxitos del pop en español",
    songs: [
      {
        id: 4,
        title: "Vivir Mi Vida",
        artist: "Marc Anthony",
        album: "3.0",
        year: 2013,
        genre: "Salsa Pop"
      },
      {
        id: 5,
        title: "La Camisa Negra",
        artist: "Juanes",
        album: "Mi Sangre",
        year: 2004,
        genre: "Pop Rock"
      }
    ]
  }
];

export const MOCK_USER = {
  valid: true,
  username: "demo_user",
  email: "demo@example.com",
  userId: 1,
  expiresAt: Date.now() + 3600000, // 1 hora desde ahora
  message: "Token válido"
};

export const MOCK_AUTH_RESPONSE = {
  accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  refreshToken: "refresh_token_example",
  tokenType: "Bearer",
  expiresIn: 3600
};
