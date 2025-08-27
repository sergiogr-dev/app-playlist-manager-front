// Modelos para la autenticación
export interface AuthenticationRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthenticationResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface TokenValidationResponse {
  valid: boolean;
  username: string;
  email: string;
  userId: number;
  expiresAt: number;
  message: string;
}

// Modelos para las playlists
export interface SongRequestDTO {
  title: string;
  artist: string;
  album?: string;
  year?: number;
  genre?: string;
}

export interface SongResponseDTO {
  id: number;
  title: string;
  artist: string;
  album?: string;
  year?: number;
  genre?: string;
}

export interface PlaylistRequestDTO {
  name: string;
  description?: string;
  songs: SongRequestDTO[];
}

export interface PlaylistResponseDTO {
  id: number;
  name: string;
  description?: string;
  songs: SongResponseDTO[];
}

// Respuestas estandarizadas de la API
export interface ApiExceptionResponse {
  type: string;
  title: string;
  code?: string;
  detail: string[];
  instance: string;
}

export interface StandardizeApiResponse<T> {
  success: boolean;
  httpCode: number;
  traceId: string;
  data?: T;
  error?: ApiExceptionResponse;
}
